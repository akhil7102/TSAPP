import { createClient } from '@supabase/supabase-js';
import { templesData } from '../src/data/temples';

async function main() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  const supabase = createClient(url, serviceKey);

  // Safety: avoid duplicate seeding if data exists
  const existing = await supabase
    .from('temples')
    .select('id', { count: 'exact', head: true });

  if ((existing.count || 0) > 0) {
    console.log(`Temples table already has ${existing.count} rows. Aborting to prevent duplicates.`);
    return;
  }

  let templesInserted = 0;
  let festivalsInserted = 0;

  for (const t of templesData) {
    const location = {
      latitude: t.location.latitude,
      longitude: t.location.longitude,
      address: {
        english: t.location.address.english,
        telugu: t.location.address.telugu,
      },
    };

    const coordinates = {
      lat: t.location.latitude,
      lng: t.location.longitude,
    };

    const timings = {
      morning: t.timings.morning,
      evening: t.timings.evening,
      pujaTimings: t.timings.pujaTimings || [],
    } as { morning: string; evening: string; pujaTimings: string[] };

    const templeRecord = {
      name: t.name,
      deity: t.deity,
      description: t.description,
      district: t.district,
      state: t.state,
      temple_type: t.templeType,
      location,
      coordinates,
      timings,
      is_open: t.isOpen,
      image_url: t.images?.[0] || null,
      images: t.images || [],
      contact_info: t.contact || null,
      features: t.features || [],
      popularity: t.popularity ?? null,
    };

    const { data: insertedTemple, error: insertTempleErr } = await supabase
      .from('temples')
      .insert([templeRecord])
      .select()
      .single();

    if (insertTempleErr) {
      console.error('Failed to insert temple', t.name.english, insertTempleErr);
      process.exit(1);
    }

    templesInserted++;

    const festivalRows = (t.festivals || []).map(f => ({
      name: f.name,
      description: f.description,
      date: f.date,
      temple_id: insertedTemple.id,
      is_active: true,
    }));

    if (festivalRows.length > 0) {
      const { error: festErr, count } = await supabase
        .from('festivals')
        .insert(festivalRows)
        .select('id', { count: 'exact', head: true });

      if (festErr) {
        console.error('Failed to insert festivals for temple', t.name.english, festErr);
        process.exit(1);
      }

      festivalsInserted += festivalRows.length;
    }
  }

  console.log(`Seeding complete. Temples: ${templesInserted}, Festivals: ${festivalsInserted}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
