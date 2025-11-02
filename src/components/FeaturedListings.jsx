import { Heart, MapPin, Clock } from 'lucide-react';

const listings = [
  {
    id: 1,
    title: 'iPhone 15 Pro 256GB • Like New',
    price: '$899',
    location: 'San Francisco, CA',
    time: '2h ago',
    image:
      'https://images.unsplash.com/photo-1695048272324-9fbe7e3f64c1?q=80&w=1200&auto=format&fit=crop',
    badge: 'Featured',
  },
  {
    id: 2,
    title: 'Tesla Model 3 Long Range 2021',
    price: '$29,900',
    location: 'Los Angeles, CA',
    time: '4h ago',
    image:
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200&auto=format&fit=crop',
    badge: 'Hot',
  },
  {
    id: 3,
    title: 'Professional Web Design Service',
    price: 'From $499',
    location: 'Remote',
    time: 'Today',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop',
    badge: 'Service',
  },
  {
    id: 4,
    title: 'Cannon EOS R6 + 24-70mm Lens Kit',
    price: '$1,750',
    location: 'Seattle, WA',
    time: '6h ago',
    image:
      'https://images.unsplash.com/photo-1495707902641-75cac588d2a3?q=80&w=1200&auto=format&fit=crop',
    badge: 'Pro',
  },
];

function ListingCard({ item }) {
  return (
    <a
      href="#"
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-white/20 hover:bg-white/10"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute left-3 top-3 rounded-full bg-white/10 px-2 py-1 text-xs font-medium text-white backdrop-blur">
          {item.badge}
        </div>
        <button
          aria-label="Save"
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/60"
        >
          <Heart className="h-5 w-5" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="line-clamp-1 font-semibold text-white">{item.title}</h3>
        <p className="mt-1 text-sm text-indigo-300">{item.price}</p>
        <div className="mt-2 flex items-center justify-between text-xs text-white/60">
          <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" />{item.location}</span>
          <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" />{item.time}</span>
        </div>
      </div>
    </a>
  );
}

export default function FeaturedListings() {
  return (
    <section id="featured" className="relative bg-[#05060a] py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white md:text-3xl">Featured listings</h2>
            <p className="mt-1 text-sm text-white/60">Hand-picked offers from trusted sellers</p>
          </div>
          <a href="#browse" className="hidden text-sm text-indigo-400 hover:text-indigo-300 md:inline">View more</a>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {listings.map((item) => (
            <ListingCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
