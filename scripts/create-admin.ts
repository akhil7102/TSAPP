import { createClient } from '@supabase/supabase-js';

async function main() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  const supabase = createClient(url, serviceKey);

  const email = 'akhilnarra02@gmail.com';
  const password = process.env.ADMIN_SEED_PASSWORD || '21325456';

  // Try to find existing user by email via admin.listUsers and update password if found
  let userId: string | null = null;
  try {
    // listUsers pagination loop (up to 10k to be safe)
    let page = 1;
    const perPage = 1000;
    while (true) {
      const { data: list, error: listErr } = await (supabase as any).auth.admin.listUsers({ page, perPage });
      if (listErr) throw listErr;
      const found = (list?.users || []).find((u: any) => u.email?.toLowerCase() === email);
      if (found) { userId = found.id; break; }
      if (!list || (list.users || []).length < perPage) break;
      page++;
    }
  } catch (e) {
    // ignore and fall back to create
  }

  if (userId) {
    const { error: updErr } = await supabase.auth.admin.updateUserById(userId, { password, email_confirm: true });
    if (updErr) {
      console.error('Failed to update existing admin user password:', updErr);
      process.exit(1);
    }
    console.log('Admin user password updated for', email);
    return;
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  });

  if (error) {
    console.error('Failed to create admin user:', error);
    process.exit(1);
  }

  console.log('Admin user created:', data.user?.id, email);
}

main().catch((e) => { console.error(e); process.exit(1); });
