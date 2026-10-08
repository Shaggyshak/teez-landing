// Thin Resend client + shared constants for the newsletter functions.
export const SITE = 'https://teez.ai';
export const FROM = Deno.env.get('NEWSLETTER_FROM') ?? 'Shay at Teez <shay@news.teez.live>';
export const REPLY_TO = Deno.env.get('NEWSLETTER_REPLY_TO') ?? 'shay@teez.live';
export const FOOTER_ADDRESS = '1178 Broadway, 3rd Floor #1464, New York, NY 10001';

export const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'content-type, apikey, authorization',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export async function resend(path: string, body: unknown, method = 'POST') {
  const r = await fetch('https://api.resend.com' + path, {
    method,
    headers: {
      Authorization: 'Bearer ' + Deno.env.get('RESEND_API_KEY'),
      'Content-Type': 'application/json',
    },
    body: method === 'GET' ? undefined : JSON.stringify(body),
  });
  const data = await r.json().catch(() => ({}));
  return { ok: r.ok, status: r.status, data };
}

export function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}
