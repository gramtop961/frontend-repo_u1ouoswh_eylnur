import { useState } from 'react';
import { Menu, X, Rocket, PlusCircle, Search } from 'lucide-react';

export default function Navbar({ onPostClick, right }) {
  const [open, setOpen] = useState(false);

  const links = [
    { name: 'Home', href: '#' },
    { name: 'Browse', href: '#browse' },
    { name: 'Categories', href: '#categories' },
    { name: 'Featured', href: '#featured' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur supports-[backdrop-filter]:bg-black/50">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 md:px-6">
        <a href="#" className="flex items-center gap-2 text-white">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 via-indigo-500 to-fuchsia-500">
            <Rocket className="h-5 w-5 text-white" />
          </span>
          <span className="text-lg font-semibold tracking-tight">FluxMarket</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.name}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm text-white/80 transition hover:bg-white/5 hover:text-white"
            >
              {l.name}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div className="relative hidden items-center md:flex">
            <Search className="pointer-events-none absolute left-3 h-4 w-4 text-white/40" />
            <input
              type="text"
              placeholder="Search..."
              className="w-56 rounded-lg border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/20 focus:bg-white/10"
            />
          </div>
          {onPostClick && (
            <button
              onClick={onPostClick}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition hover:from-blue-600 hover:to-indigo-600"
            >
              <PlusCircle className="h-4 w-4" /> Post an Ad
            </button>
          )}
          {right}
        </div>

        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-white md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-black/80 px-4 py-3 md:hidden">
          <div className="mb-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-white/40" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/20 focus:bg-white/10"
              />
            </div>
          </div>
          <nav className="flex flex-col">
            {links.map((l) => (
              <a
                key={l.name}
                href={l.href}
                className="rounded-md px-3 py-2 text-sm text-white/80 transition hover:bg-white/5 hover:text-white"
              >
                {l.name}
              </a>
            ))}
            {onPostClick && (
              <button
                onClick={onPostClick}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition hover:from-blue-600 hover:to-indigo-600"
              >
                <PlusCircle className="h-4 w-4" /> Post an Ad
              </button>
            )}
            {right}
          </nav>
        </div>
      )}
    </header>
  );
}
