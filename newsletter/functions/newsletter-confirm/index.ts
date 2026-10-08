// GET ?t=<token>. Confirms the subscriber, adds them to the Resend segment, and
// redirects to a static page on teez.ai (the Supabase gateway serves HTML as text/plain).
import { createClient } from 'npm:@supabase/supabase-js@2';
import { SITE, resend } from '../_shared/resend.ts';

const back = (status: string) =>
  new Response(null, { status: 302, headers: { Location: `${SITE}/newsletter.html?status=${status}` } });

Deno.serve(async (req) => {
  const t = new URL(req.url).searchParams.get('t') ?? '';
  if (!/^[0-9a-f-]{36}$/i.test(t)) return back('invalid');

  const sb = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  const { data: sub } = await sb.from('newsletter_subscribers')
    .select('id,email,status').eq('token', t).maybeSingle();
  if (!sub) return back('invalid');
  if (sub.status === 'confirmed') return back('confirmed');

  // Resend first: if it fails we leave the row pending so the link still works on retry.
  const c = await resend('/contacts', {
    email: sub.email,
    unsubscribed: false,
    segments: [{ id: Deno.env.get('RESEND_SEGMENT_ID') }],
  });
  // A contact that already exists is fine; anything else is a real failure.
  if (!c.ok && c.status !== 409) {
    console.error('resend contact failed', c.status, JSON.stringify(c.data));
    return back('error');
  }

  await sb.from('newsletter_subscribers').update({
    status: 'confirmed',
    confirmed_at: new Date().toISOString(),
    unsubscribed_at: null,
    resend_contact_id: c.data?.id ?? null,
  }).eq('id', sub.id);
  return back('confirmed');
});
