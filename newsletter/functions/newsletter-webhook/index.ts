// Resend webhook -> keeps newsletter_subscribers in step with Resend.
// Subscribe to: contact.updated, email.bounced, email.complained.
// An unsubscribe done on Resend's hosted page arrives as contact.updated with unsubscribed=true.
// Resubscribing is NOT mirrored back: that has to go through the double opt-in form.
import { createClient } from 'npm:@supabase/supabase-js@2';
import { Webhook } from 'npm:svix@1.45.1';

Deno.serve(async (req) => {
  const raw = await req.text(); // signature covers the exact raw body
  let evt: { type: string; data: Record<string, unknown> };
  try {
    evt = new Webhook(Deno.env.get('RESEND_WEBHOOK_SECRET')!).verify(raw, {
      'svix-id': req.headers.get('svix-id') ?? '',
      'svix-timestamp': req.headers.get('svix-timestamp') ?? '',
      'svix-signature': req.headers.get('svix-signature') ?? '',
    }) as typeof evt;
  } catch {
    return new Response('bad signature', { status: 401 });
  }

  const sb = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  const mark = (email: string, status: string) =>
    sb.from('newsletter_subscribers')
      .update({ status, unsubscribed_at: status === 'unsubscribed' ? new Date().toISOString() : null })
      .ilike('email', email).in('status', ['pending', 'confirmed']);

  if (evt.type === 'contact.updated' && evt.data.unsubscribed === true) {
    await mark(String(evt.data.email), 'unsubscribed');
  } else if (evt.type === 'email.bounced' || evt.type === 'email.complained') {
    const to = (evt.data.to as string[] | undefined) ?? [];
    for (const addr of to) await mark(addr, evt.type === 'email.bounced' ? 'bounced' : 'complained');
  }
  return new Response('ok');
});
