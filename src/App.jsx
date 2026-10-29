import { useEffect, useState } from 'react';
import AboutUs from './AboutUs.jsx';
import ProductList, { Navbar } from './ProductList.jsx';
import CartItem from './CartItem.jsx';
import './App.css';

function currentPage() {
  const page = window.location.hash.slice(1);
  return ['plants', 'cart'].includes(page) ? page : 'home';
}

export default function App() {
  const [page, setPage] = useState(currentPage);
  const [showProductList, setShowProductList] = useState(() => currentPage() === 'plants');
  const handleGetStarted = () => {
    setShowProductList(true);
    setPage('plants');
    window.location.hash = 'plants';
  };
  useEffect(() => {
    const onHashChange = () => {
      const nextPage = currentPage();
      setPage(nextPage);
      setShowProductList(nextPage === 'plants');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link" onClick={(event) => {
        event.preventDefault(); document.getElementById('main-content')?.focus();
      }}>Skip to content</a>
      {page === 'home' && <Navbar page="home" />}
      {showProductList ? <ProductList /> : page === 'cart' ? <CartItem /> : (
        <main id="main-content" tabIndex={-1}>
          <section className="landing-page background-image" aria-labelledby="landing-title">
            <div className="hero-copy">
              <p className="eyebrow">A LITTLE GREEN GOES A LONG WAY</p>
              <h1 id="landing-title">Welcome to Paradise Nursery</h1>
              <p>Make room for something living. Discover houseplants that bring
                texture, colour, and a little everyday joy into your home.</p>
              <button onClick={handleGetStarted} className="button primary">Get Started <span aria-hidden="true">↗</span></button>
              <span className="hero-note">18 plants. Endless possibilities.</span>
            </div>
          </section>
          <div className="about-wrap"><span className="section-number">01 / OUR STORY</span><AboutUs /></div>
        </main>
      )}
      <footer><span>❧ Paradise Nursery</span><span>A little nature, a little closer.</span></footer>
    </>
  );
}
