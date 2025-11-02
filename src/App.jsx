import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import FeaturedListings from './components/FeaturedListings';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <FeaturedListings />
      </main>
      <footer className="border-t border-white/10 bg-black/60 py-10 text-center text-sm text-white/60">
        Built with love for modern classifieds • © {new Date().getFullYear()} FluxMarket
      </footer>
    </div>
  );
}

export default App;
