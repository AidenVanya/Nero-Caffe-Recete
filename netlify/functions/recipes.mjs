import { getStore } from '@netlify/blobs';

// Shared recipe storage for Nero Caffè.
// GET  -> { recipes: [...] | null }   (null = henüz kaydedilmemiş, istemci SEED kullanır)
// POST -> { action:'auth', password }        : sadece şifre doğrular
//      -> { password, recipes:[...] }         : tüm listeyi herkes için kaydeder
const PASSWORD = process.env.ADMIN_PASSWORD || 'nero2026';
const KEY = 'data';
const CATS = ['sicak', 'soguk', 'oz', 'yemek'];

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
}

export default async (req) => {
  const store = getStore('nero-recipes');

  if (req.method === 'GET') {
    const data = await store.get(KEY, { type: 'json' });
    return json({ recipes: data ?? null });
  }

  if (req.method === 'POST') {
    let body;
    try { body = await req.json(); }
    catch { return json({ error: 'bad json' }, 400); }

    if (body.password !== PASSWORD) return json({ error: 'unauthorized' }, 401);
    if (body.action === 'auth') return json({ ok: true });

    if (!Array.isArray(body.recipes)) return json({ error: 'recipes array required' }, 400);
    const valid = body.recipes.every(
      (r) => r && CATS.includes(r.c) && typeof r.n === 'string' && Array.isArray(r.steps)
    );
    if (!valid) return json({ error: 'invalid recipe format' }, 400);

    await store.setJSON(KEY, body.recipes);
    return json({ ok: true, count: body.recipes.length });
  }

  return json({ error: 'method not allowed' }, 405);
};

export const config = { path: '/.netlify/functions/recipes' };
