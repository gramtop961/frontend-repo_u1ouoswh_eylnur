import { useState } from 'react';
import Spline from '@splinetool/react-spline';
import { Search, MapPin, SlidersHorizontal } from 'lucide-react';

export default function Hero() {
  const [query, setQuery] = useState('');

  function onSearch(e) {
    e.preventDefault();
    const anchor = document.getElementById('featured');
    if (anchor) anchor.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-black to-[#05060a]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24 lg:gap-16 lg:py-32 md:px-6">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Safe, fast and modern classifieds
          </div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Buy, sell and hire with style
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/70 sm:text-lg">
            Discover local deals on electronics, cars, services and more. List your items in seconds and reach thousands of buyers.
          </p>

          <form onSubmit={onSearch} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search items or services"
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white placeholder:text-white/40 outline-none transition focus:border-white/20 focus:bg-white/10"
              />
            </div>
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
              <input
                type="text"
                placeholder="Location"
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white placeholder:text-white/40 outline-none transition focus:border-white/20 focus:bg-white/10 sm:w-48"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 px-5 py-3 font-medium text-white shadow-lg shadow-indigo-500/25 transition hover:from-blue-600 hover:to-indigo-600"
            >
              <SlidersHorizontal className="h-5 w-5" /> Explore
            </button>
          </form>

          <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
            {['Phones', 'Vehicles', 'Home & Garden', 'Jobs', 'Services'].map((t) => (
              <button
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full rounded-2xl border border-white/10 bg-gradient-to-tr from-indigo-900/30 via-blue-900/20 to-fuchsia-900/20">
          <Spline
            scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          />
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-0 overflow-hidden">
        <div className="mx-auto h-72 w-[110%] max-w-7xl bg-[radial-gradient(closest-side,rgba(99,102,241,0.25),transparent)] blur-2xl" />
      </div>
    </section>
  );
}
