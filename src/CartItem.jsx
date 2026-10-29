import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity, selectCartItems, selectCartQuantity, selectCartTotal } from './CartSlice.jsx';
import { formatMoney } from './ProductList.jsx';

export default function CartItem() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectCartQuantity);
  const totalCost = useSelector(selectCartTotal);
  const [checkoutMessage, setCheckoutMessage] = useState('');

  const handleIncrease = (item) => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  // Decreasing the last unit removes its row and enables Add to Cart again.
  const handleDecrease = (item) => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));

  return (
    <main className="cart-page container" id="main-content" tabIndex={-1}>
      <div className="page-intro"><div><p className="eyebrow">YOUR LITTLE PARADISE</p><h1>Shopping Cart</h1>
        <p aria-live="polite">Total number of plants: <strong>{totalQuantity}</strong></p></div>
        <a href="#plants" className="text-link">← Continue Shopping</a></div>
      {items.length === 0 ? (
        <section className="empty-cart"><span aria-hidden="true">❧</span><h2>A little room to grow.</h2>
          <p>Your cart is empty. Find a green companion to bring home.</p><a href="#plants" className="button primary">Explore Plants →</a>
          <p>Total cost: {formatMoney(0)}</p></section>
      ) : (
        <div className="cart-layout"><section className="cart-items" aria-label="Plants in your cart">
          {items.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} width="140" height="140" />
              <div className="cart-item-details"><h2>{item.name}</h2><p>Unit price: {formatMoney(item.price)}</p>
                <div className="quantity-controls" aria-label={`Quantity for ${item.name}`}>
                  <button onClick={() => handleDecrease(item)} aria-label={`Decrease ${item.name} quantity`}>−</button>
                  <output aria-label={`${item.name} quantity`} aria-live="polite">{item.quantity}</output>
                  <button onClick={() => handleIncrease(item)} aria-label={`Increase ${item.name} quantity`}>+</button>
                </div>
              </div>
              <div className="cart-item-end"><strong aria-live="polite">{formatMoney(item.price * item.quantity)}</strong>
                <span className="subtotal-label">Plant total</span>
                <button className="delete-button" onClick={() => dispatch(removeItem(item.id))} aria-label={`Delete ${item.name}`}>Delete</button>
              </div>
            </article>
          ))}
        </section>
        <aside className="order-summary" aria-labelledby="summary-title"><p className="eyebrow">READY TO GROW?</p><h2 id="summary-title">Order summary</h2>
          <div><span>Total plants</span><span aria-live="polite">{totalQuantity}</span></div>
          <div className="order-total"><span>Total cost</span><strong aria-live="polite">{formatMoney(totalCost)}</strong></div>
          <button className="button primary" onClick={() => setCheckoutMessage('Coming Soon! Checkout is not available yet.')}>Checkout →</button>
          <p className="checkout-message" role="status">{checkoutMessage}</p>
          <a href="#plants" className="text-link">Continue Shopping</a>
        </aside></div>
      )}
    </main>
  );
}
