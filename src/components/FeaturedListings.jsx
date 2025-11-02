import { useEffect, useState } from 'react';
import { Heart, MapPin, Clock, MessageSquare } from 'lucide-react';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function ListingCard({ item, user, onSaved }) {
  const [saving, setSaving] = useState(false);
  const [msgOpen, setMsgOpen] = useState(false);
  const [content, setContent] = useState('Hi! Is this still available?');
  const priceText = typeof item.price === 'number' ? `$${item.price}` : item.price;
  const image = (item.images && item.images[0]) || item.image || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop';

  async function save() {
    if (!user) return alert('Please sign in to save listings.');
    setSaving(true);
    try {
      const res = await fetch(`${API}/api/saved`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, listing_id: item.id }),
      });
      if (!res.ok) throw new Error('Failed to save');
      onSaved?.();
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  }

  async function sendMessage(e) {
    e.preventDefault();
    if (!user) return alert('Please sign in to message sellers.');
    try {
      await fetch(`${API}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listing_id: item.id,
          from_user_id: user.id,
          to_user_id: item.user_id,
          content,
        }),
      });
      setMsgOpen(false);
      setContent('Hi! Is this still available?');
      alert('Message sent');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-white/20 hover:bg-white/10">
      <div className="relative h-48 w-full overflow-hidden">
        <img src={image} alt={item.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <button
          aria-label="Save"
          onClick={save}
          disabled={saving}
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/60"
        >
          <Heart className="h-5 w-5" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="line-clamp-1 font-semibold text-white">{item.title}</h3>
        <p className="mt-1 text-sm text-indigo-300">{priceText}</p>
        <div className="mt-2 flex items-center justify-between text-xs text-white/60">
          <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" />{item.location || '—'}</span>
          <button onClick={()=>setMsgOpen(true)} className="inline-flex items-center gap-1 text-indigo-300 hover:text-indigo-200"><MessageSquare className="h-4 w-4" /> Contact</button>
        </div>
      </div>

      {msgOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0b11] p-5">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="font-semibold">Message seller</h4>
              <button onClick={()=>setMsgOpen(false)} className="rounded-md px-2 py-1 text-white/60 hover:bg-white/10">✕</button>
            </div>
            <form onSubmit={sendMessage} className="space-y-3">
              <textarea value={content} onChange={(e)=>setContent(e.target.value)} className="h-28 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white" />
              <div className="flex items-center justify-end gap-2">
                <button type="button" onClick={()=>setMsgOpen(false)} className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white/80 hover:bg-white/10">Cancel</button>
                <button className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 px-5 py-2 font-medium text-white hover:from-blue-600 hover:to-indigo-600">Send</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FeaturedListings({ user, refreshKey }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API}/api/listings?limit=12`);
        const data = await res.json();
        if (alive) setItems(data.items.map((d)=>({ ...d, id: d.id || d._id })));
      } catch (e) {
        console.error(e);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [refreshKey]);

  return (
    <section id="featured" className="relative bg-[#05060a] py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white md:text-3xl">Featured listings</h2>
            <p className="mt-1 text-sm text-white/60">Hand-picked offers from trusted sellers</p>
          </div>
        </div>

        {loading ? (
          <p className="text-white/70">Loading…</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
              <ListingCard key={item.id} item={item} user={user} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
