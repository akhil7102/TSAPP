import { createClient } from '@supabase/supabase-js';
import { convertCSVToTemples } from './parse-csv-temples';

async function main() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  const supabase = createClient(url, serviceKey);

  // Get all temples from CSV
  const newTemples = convertCSVToTemples();
  console.log(`Found ${newTemples.length} temples to process from CSV data`);

  // Get existing temple names to check for duplicates
  const { data: existingTemples, error: fetchError } = await supabase
    .from('temples')
    .select('name');

  if (fetchError) {
    console.error('Failed to fetch existing temples:', fetchError);
    process.exit(1);
  }

  // Create a set of existing English temple names for fast lookup
  const existingNames = new Set(
    existingTemples?.map(temple => temple.name?.english?.toLowerCase().trim()) || []
  );

  console.log(`Found ${existingNames.size} existing temples in database`);

  let templesInserted = 0;
  let templesSkipped = 0;

  for (const temple of newTemples) {
    const englishName = temple.name.english.toLowerCase().trim();
    
    // Check if temple already exists by English name
    if (existingNames.has(englishName)) {
      console.log(`Skipping duplicate temple: ${temple.name.english}`);
      templesSkipped++;
      continue;
    }

    // Prepare temple record for insertion
    const location = {
      latitude: temple.location.latitude,
      longitude: temple.location.longitude,
      address: {
        english: temple.location.address.english,
        telugu: temple.location.address.telugu,
      },
    };

    const coordinates = {
      lat: temple.location.latitude,
      lng: temple.location.longitude,
    };

    const timings = {
      morning: temple.timings.morning,
      evening: temple.timings.evening,
      pujaTimings: temple.timings.pujaTimings || [],
    };

    const templeRecord = {
      name: temple.name,
      deity: temple.deity,
      description: temple.description,
      district: temple.district,
      state: temple.state,
      temple_type: temple.templeType,
      location,
      coordinates,
      timings,
      is_open: temple.isOpen,
      image_url: temple.images?.[0] || null,
      images: temple.images || [],
      contact_info: temple.contact || null,
      features: temple.features || [],
      popularity: temple.popularity ?? null
    };

    // Insert temple
    const { data: insertedTemple, error: insertTempleErr } = await supabase
      .from('temples')
      .insert([templeRecord])
      .select()
      .single();

    if (insertTempleErr) {
      console.error('Failed to insert temple', temple.name.english, insertTempleErr);
      continue; // Continue with next temple instead of exiting
    }

    console.log(`✓ Inserted temple: ${temple.name.english}`);
    templesInserted++;

    // Add temple name to existing set to avoid duplicates in same batch
    existingNames.add(englishName);

    // Handle festivals if any (CSV temples don't have specific festivals, but structure is ready)
    if (temple.festivals && temple.festivals.length > 0) {
      const festivalRows = temple.festivals.map(f => ({
        name: f.name,
        description: f.description,
        date: f.date,
        temple_id: insertedTemple.id,
        is_active: true,
      }));

      const { error: festErr } = await supabase
        .from('festivals')
        .insert(festivalRows);

      if (festErr) {
        console.error('Failed to insert festivals for temple', temple.name.english, festErr);
      }
    }
  }

  console.log('\n=== SEEDING COMPLETE ===');
  console.log(`Templates processed: ${newTemples.length}`);
  console.log(`Temples inserted: ${templesInserted}`);
  console.log(`Temples skipped (duplicates): ${templesSkipped}`);
  console.log(`Success rate: ${((templesInserted / newTemples.length) * 100).toFixed(1)}%`);
}

main().catch((e) => {
  console.error('Seeding failed:', e);
  process.exit(1);
});
