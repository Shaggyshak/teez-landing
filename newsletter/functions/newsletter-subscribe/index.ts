// Public signup. Always answers { ok: true } so the form can't be used to probe
// which addresses are already on the list.
import { createClient } from 'npm:@supabase/supabase-js@2';
import { CORS, FROM, REPLY_TO, SITE, json, resend } from '../_shared/resend.ts';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RESEND_AFTER_MS = 10 * 60 * 1000; // don't re-send a confirm email more than once per 10 min

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return json({ error: 'method' }, 405);

  const b = await req.json().catch(() => ({}));
  if (b.website) return json({ ok: true }); // honeypot
  const email = String(b.email ?? '').trim().toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 254) return json({ error: 'invalid_email' }, 400);
  const source = String(b.source ?? 'site').slice(0, 60);

  const sb = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  const { data: existing } = await sb.from('newsletter_subscribers')
    .select('id,status,token,confirm_sent_at').ilike('email', email).maybeSingle();

  if (existing?.status === 'confirmed') return json({ ok: true });

  let token = existing?.token as string | undefined;
  if (!existing) {
    const { data, error } = await sb.from('newsletter_subscribers')
      .insert({ email, source, confirm_sent_at: new Date().toISOString() })
      .select('token').single();
    if (error) return json({ ok: true }); // lost a race with a concurrent signup; stay quiet
    token = data.token;
  } else {
    const last = existing.confirm_sent_at ? Date.parse(existing.confirm_sent_at) : 0;
    if (Date.now() - last < RESEND_AFTER_MS) return json({ ok: true });
    // Re-subscribing after an unsubscribe goes back through confirmation.
    await sb.from('newsletter_subscribers')
      .update({ status: 'pending', confirm_sent_at: new Date().toISOString() })
      .eq('id', existing.id);
  }

  const link = `${Deno.env.get('SUPABASE_URL')}/functions/v1/newsletter-confirm?t=${token}`;
  const sent = await resend('/emails', {
    from: FROM,
    reply_to: REPLY_TO,
    to: [email],
    subject: 'Confirm your Teez newsletter subscription',
    html: `<p>Confirm your subscription to the weekly Teez newsletter (multifamily underwriting notes, sent by the Teez team):</p>
<p><a href="${link}">Confirm subscription</a></p>
<p>If you didn't ask for this, ignore this email and you won't be added.</p>
<p style="color:#6A7178;font-size:12px">Teez, Inc. · 1178 Broadway, 3rd Floor #1464, New York, NY 10001 · <a href="${SITE}">teez.ai</a></p>`,
    text: `Confirm your subscription to the weekly Teez newsletter:\n${link}\n\nIf you didn't ask for this, ignore this email and you won't be added.`,
  });
  if (!sent.ok) console.error('confirm email failed', sent.status, JSON.stringify(sent.data));
  return json({ ok: true });
});
