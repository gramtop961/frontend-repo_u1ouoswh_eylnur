import { Car, Smartphone, Home, Wrench, Briefcase, Shirt, Camera, Gamepad2, Bike } from 'lucide-react';

const categories = [
  { name: 'Vehicles', icon: Car },
  { name: 'Electronics', icon: Smartphone },
  { name: 'Property', icon: Home },
  { name: 'Services', icon: Wrench },
  { name: 'Jobs', icon: Briefcase },
  { name: 'Fashion', icon: Shirt },
  { name: 'Cameras', icon: Camera },
  { name: 'Gaming', icon: Gamepad2 },
  { name: 'Bikes', icon: Bike },
];

export default function Categories() {
  return (
    <section id="categories" className="relative bg-[#07080d] py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white md:text-3xl">Browse by category</h2>
            <p className="mt-1 text-sm text-white/60">Find exactly what you need faster</p>
          </div>
          <a href="#browse" className="hidden text-sm text-indigo-400 hover:text-indigo-300 md:inline">See all</a>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {categories.map(({ name, icon: Icon }) => (
            <a
              key={name}
              href="#browse"
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-white/20 hover:bg-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 ring-1 ring-inset ring-white/10">
                  <Icon className="h-5 w-5 text-indigo-300" />
                </div>
                <div>
                  <p className="font-medium text-white">{name}</p>
                  <p className="text-xs text-white/50">2,000+ ads</p>
                </div>
              </div>
              <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-indigo-500/10 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
