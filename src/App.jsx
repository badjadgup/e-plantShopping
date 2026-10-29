import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AboutUs from './AboutUs.jsx';
import ProductList from './ProductList.jsx';
import CartItem from './CartItem.jsx';
import { selectCartQuantity } from './CartSlice.jsx';
import './App.css';

function currentPage() {
  const page = window.location.hash.slice(1);
  return ['plants', 'cart'].includes(page) ? page : 'home';
}

export function Navbar({ page }) {
  const totalQuantity = useSelector(selectCartQuantity);
  return (
    <header className="site-header">
      <a href="#home" className="brand" aria-label="Paradise Nursery home">
        <span className="brand-symbol" aria-hidden="true">❧</span>
        <span>Paradise Nursery<small>GROW SOMETHING GOOD</small></span>
      </a>
      <nav aria-label="Main navigation">
        <a href="#home" aria-current={page === 'home' ? 'page' : undefined}>Home</a>
        <a href="#plants" aria-current={page === 'plants' ? 'page' : undefined}>Plants</a>
        <a className="cart-link" href="#cart" aria-current={page === 'cart' ? 'page' : undefined}
          aria-label={`Cart, ${totalQuantity} items`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M3 3h2l2.4 12h11.4l2-8H6M9 20h.01M18 20h.01" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Cart</span><span className="cart-count" aria-live="polite">{totalQuantity}</span>
        </a>
      </nav>
    </header>
  );
}

export default function App() {
  const [page, setPage] = useState(currentPage);
  useEffect(() => {
    const onHashChange = () => { setPage(currentPage()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link" onClick={(event) => {
        event.preventDefault(); document.getElementById('main-content')?.focus();
      }}>Skip to content</a>
      <Navbar page={page} />
      {page === 'home' ? (
        <main id="main-content" tabIndex={-1}>
          <section className="landing-page" aria-labelledby="landing-title">
            <div className="hero-copy">
              <p className="eyebrow">A LITTLE GREEN GOES A LONG WAY</p>
              <h1 id="landing-title">Welcome to<br /><em>Paradise Nursery.</em></h1>
              <p>Make room for something living. Discover houseplants that bring
                texture, colour, and a little everyday joy into your home.</p>
              <a href="#plants" className="button primary">Get Started <span aria-hidden="true">↗</span></a>
              <span className="hero-note">18 plants. Endless possibilities.</span>
            </div>
          </section>
          <div className="about-wrap"><span className="section-number">01 / OUR STORY</span><AboutUs /></div>
        </main>
      ) : page === 'plants' ? <ProductList /> : <CartItem />}
      <footer><span>❧ Paradise Nursery</span><span>A little nature, a little closer.</span></footer>
    </>
  );
}
