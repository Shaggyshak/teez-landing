// Admin only (x-admin-secret). Body: { issue_id, test_to? }
//  - with test_to: emails one rendered copy of the issue (draft or approved) to that address.
//  - without:      the issue must be 'approved'. It is claimed atomically (approved -> sending),
//                  created and sent as a Resend Broadcast to the segment, then marked 'sent'.
import { createClient } from 'npm:@supabase/supabase-js@2';
import { marked } from 'npm:marked@12.0.2';
import { FOOTER_ADDRESS, FROM, REPLY_TO, SITE, json, resend } from '../_shared/resend.ts';

const UNSUB = '{{{RESEND_UNSUBSCRIBE_URL}}}';

function render(bodyMd: string) {
  const body = marked.parse(bodyMd, { async: false }) as string;
  return `<div style="max-width:620px;margin:0 auto;font:16px/1.55 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#1F2329">
${body}
<hr style="border:none;border-top:1px solid #E1E3E6;margin:32px 0 16px">
<p style="color:#6A7178;font-size:12px;line-height:1.5">You're getting this because you subscribed at <a href="${SITE}" style="color:#6A7178">teez.ai</a>.
<a href="${UNSUB}" style="color:#6A7178">Unsubscribe</a><br>Teez, Inc. · ${FOOTER_ADDRESS}</p>
</div>`;
}

Deno.serve(async (req) => {
  const secret = Deno.env.get('NEWSLETTER_ADMIN_SECRET');
  if (!secret || req.headers.get('x-admin-secret') !== secret) return json({ error: 'unauthorized' }, 401);
  if (req.method !== 'POST') return json({ error: 'method' }, 405);

  const { issue_id, test_to } = await req.json().catch(() => ({}));
  if (!issue_id) return json({ error: 'issue_id required' }, 400);

  const sb = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

  if (test_to) {
    const { data: issue } = await sb.from('newsletter_issues').select('subject,body_md').eq('id', issue_id).maybeSingle();
    if (!issue) return json({ error: 'not_found' }, 404);
    const r = await resend('/emails', {
      from: FROM, reply_to: REPLY_TO, to: [test_to],
      subject: '[TEST] ' + issue.subject,
      html: render(issue.body_md).replace(UNSUB, '#'),
    });
    return r.ok ? json({ ok: true, test: true }) : json({ error: 'resend', detail: r.data }, 502);
  }

  // Atomic claim: only one caller can move approved -> sending, so a double click can't double send.
  const { data: issue } = await sb.from('newsletter_issues')
    .update({ status: 'sending', send_error: null, updated_at: new Date().toISOString() })
    .eq('id', issue_id).eq('status', 'approved')
    .select('subject,body_md').maybeSingle();
  if (!issue) return json({ error: 'not_approved_or_already_sending' }, 409);

  const b = await resend('/broadcasts', {
    segment_id: Deno.env.get('RESEND_SEGMENT_ID'),
    from: FROM,
    reply_to: REPLY_TO,
    subject: issue.subject,
    name: issue.subject,
    html: render(issue.body_md),
    send: true,
  });

  if (!b.ok) {
    await sb.from('newsletter_issues')
      .update({ status: 'approved', send_error: JSON.stringify(b.data).slice(0, 500) })
      .eq('id', issue_id);
    return json({ error: 'resend', detail: b.data }, 502);
  }

  await sb.from('newsletter_issues').update({
    status: 'sent', sent_at: new Date().toISOString(), resend_broadcast_id: b.data.id,
  }).eq('id', issue_id);
  return json({ ok: true, broadcast_id: b.data.id });
});
