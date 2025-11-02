import { useState } from 'react';
import { PlusCircle } from 'lucide-react';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function PostAd({ user, onCreated }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Electronics',
    listing_type: 'sale',
    location: '',
    images: '', // comma-separated
  });

  async function submit(e) {
    e.preventDefault();
    if (!user) {
      setError('Please sign in to post an ad.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const payload = {
        user_id: user.id,
        title: form.title,
        description: form.description,
        price: parseFloat(form.price || '0'),
        category: form.category,
        listing_type: form.listing_type,
        location: form.location || undefined,
        images: form.images
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      };
      const res = await fetch(`${API}/api/listings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error((await res.json()).detail || 'Failed to create listing');
      setOpen(false);
      setForm({ title: '', description: '', price: '', category: 'Electronics', listing_type: 'sale', location: '', images: '' });
      onCreated?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition hover:from-blue-600 hover:to-indigo-600">
        <PlusCircle className="h-4 w-4" /> Post an Ad
      </button>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0a0b11] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Create a new listing</h3>
              <button onClick={() => setOpen(false)} className="rounded-md px-2 py-1 text-white/60 hover:bg-white/10">✕</button>
            </div>
            <form onSubmit={submit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/40 md:col-span-2" placeholder="Title" required value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} />
              <textarea className="h-32 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/40 md:col-span-2" placeholder="Description" required value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} />
              <input type="number" min="0" step="0.01" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/40" placeholder="Price" required value={form.price} onChange={(e)=>setForm({...form,price:e.target.value})} />
              <input className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/40" placeholder="Category" value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})} />
              <select className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white" value={form.listing_type} onChange={(e)=>setForm({...form,listing_type:e.target.value})}>
                <option value="sale">For Sale</option>
                <option value="service">Service</option>
                <option value="rent">For Rent</option>
              </select>
              <input className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/40" placeholder="Location" value={form.location} onChange={(e)=>setForm({...form,location:e.target.value})} />
              <input className="md:col-span-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/40" placeholder="Image URLs (comma separated)" value={form.images} onChange={(e)=>setForm({...form,images:e.target.value})} />
              {error && <p className="md:col-span-2 text-sm text-red-400">{error}</p>}
              <div className="md:col-span-2 flex items-center justify-end gap-2">
                <button type="button" onClick={()=>setOpen(false)} className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white/80 hover:bg-white/10">Cancel</button>
                <button disabled={loading} className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 px-5 py-2 font-medium text-white hover:from-blue-600 hover:to-indigo-600 disabled:opacity-60">{loading? 'Posting…' : 'Post listing'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
