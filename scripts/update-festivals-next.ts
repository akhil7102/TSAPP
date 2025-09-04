import { createClient } from '@supabase/supabase-js';

function toYYYYMMDD(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

async function main() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  const supabase = createClient(url, serviceKey);
  const { data: festivals, error } = await supabase.from('festivals').select('*');
  if (error) {
    console.error('Fetch festivals error', error);
    process.exit(1);
  }

  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  let updated = 0;
  for (const f of festivals || []) {
    const original = new Date(f.date);
    if (isNaN(original.getTime())) continue;

    let next = new Date(today.getFullYear(), original.getMonth(), original.getDate());
    if (next < todayStart) {
      next = new Date(today.getFullYear() + 1, original.getMonth(), original.getDate());
    }

    if (toYYYYMMDD(next) !== f.date) {
      const { error: updErr } = await supabase
        .from('festivals')
        .update({ date: toYYYYMMDD(next) })
        .eq('id', f.id);
      if (updErr) {
        console.error('Update failed for festival', f.id, updErr);
        process.exit(1);
      }
      updated++;
    }
  }

  console.log(`Adjusted ${updated} festival dates to next future occurrence.`);
}

main().catch(err => { console.error(err); process.exit(1); });
