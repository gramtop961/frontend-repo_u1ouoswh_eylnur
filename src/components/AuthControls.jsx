import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function AuthControls({ user, setUser }) {
  const [mode, setMode] = useState('login');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', location: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('flux_user');
    if (stored && !user) setUser(JSON.parse(stored));
  }, [setUser, user]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (mode === 'register') {
        const res = await fetch(`${API}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password,
            location: form.location || undefined,
          }),
        });
        if (!res.ok) throw new Error((await res.json()).detail || 'Registration failed');
        // auto login
      }
      const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      if (!res.ok) throw new Error((await res.json()).detail || 'Login failed');
      const data = await res.json();
      setUser(data);
      localStorage.setItem('flux_user', JSON.stringify(data));
      setOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem('flux_user');
    setUser(null);
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="hidden text-sm text-white/80 md:inline">Hi, {user.name.split(' ')[0]}</span>
        <button onClick={logout} className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/80 hover:bg-white/10">Logout</button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button onClick={() => setOpen(true)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">Sign in</button>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0b11] p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">{mode === 'login' ? 'Sign in' : 'Create account'}</h3>
              <button onClick={() => setOpen(false)} className="rounded-md px-2 py-1 text-white/60 hover:bg-white/10">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              {mode === 'register' && (
                <input value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/40" placeholder="Full name" required />
              )}
              <input value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} type="email" className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/40" placeholder="Email" required />
              <input value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} type="password" className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/40" placeholder="Password" required />
              {mode === 'register' && (
                <input value={form.location} onChange={(e)=>setForm({...form,location:e.target.value})} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/40" placeholder="Location (optional)" />
              )}
              {error && <p className="text-sm text-red-400">{error}</p>}
              <button disabled={loading} className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-2 font-medium text-white hover:from-blue-600 hover:to-indigo-600 disabled:opacity-60">{loading ? 'Please wait…' : (mode === 'login' ? 'Sign in' : 'Create account')}</button>
            </form>
            <div className="mt-3 text-center text-sm text-white/60">
              {mode === 'login' ? (
                <button onClick={() => setMode('register')} className="text-indigo-300 hover:text-indigo-200">Need an account? Register</button>
              ) : (
                <button onClick={() => setMode('login')} className="text-indigo-300 hover:text-indigo-2 00">Have an account? Sign in</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
