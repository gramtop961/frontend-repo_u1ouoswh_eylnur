import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import FeaturedListings from './components/FeaturedListings';
import AuthControls from './components/AuthControls';
import PostAd from './components/PostAd';

function App() {
  const [user, setUser] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [openPost, setOpenPost] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar
        onPostClick={() => setOpenPost(true)}
        right={<AuthControls user={user} setUser={setUser} />}
      />
      <main>
        <Hero />
        <Categories />
        <FeaturedListings user={user} refreshKey={refreshKey} />
      </main>
      <footer className="border-t border-white/10 bg-black/60 py-10 text-center text-sm text-white/60">
        Built with love for modern classifieds • © {new Date().getFullYear()} FluxMarket
      </footer>

      {openPost && (
        <div className="fixed inset-0 z-50">
          <PostAd
            user={user}
            onCreated={() => {
              setRefreshKey((k) => k + 1);
              setOpenPost(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
