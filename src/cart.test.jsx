import React from 'react';
import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { render, screen, cleanup, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import cartReducer, { addItem, removeItem, updateQuantity, selectCartQuantity, selectCartTotal } from './CartSlice.jsx';
import { createAppStore } from './store.js';
import App from './App.jsx';
import { plantCategories } from './ProductList.jsx';

beforeEach(() => { vi.spyOn(window, 'scrollTo').mockImplementation(() => {}); });
afterEach(() => { cleanup(); window.location.hash = ''; vi.restoreAllMocks(); });
const monstera = plantCategories[0].plants[0];

describe('cart state', () => {
  it('combines duplicate additions and recalculates totals after changes', () => {
    let cart = cartReducer(undefined, addItem(monstera));
    cart = cartReducer(cart, addItem(monstera));
    expect(cart.items).toHaveLength(1);
    expect(selectCartQuantity({ cart })).toBe(2);
    expect(selectCartTotal({ cart })).toBe(56);
    cart = cartReducer(cart, updateQuantity({ id: monstera.id, quantity: 4 }));
    expect(selectCartTotal({ cart })).toBe(112);
    cart = cartReducer(cart, removeItem(monstera.id));
    expect(selectCartTotal({ cart })).toBe(0);
  });
  it('ignores invalid quantities and removes at zero', () => {
    let cart = cartReducer(undefined, addItem(monstera));
    for (const quantity of [-1, 1.5, NaN, Infinity]) {
      cart = cartReducer(cart, updateQuantity({ id: monstera.id, quantity }));
      expect(cart.items[0].quantity).toBe(1);
    }
    cart = cartReducer(cart, updateQuantity({ id: monstera.id, quantity: 0 }));
    expect(cart.items).toEqual([]);
  });
});

describe('shopping journey', () => {
  it('has six distinct plants in each of three collections', () => {
    expect(plantCategories).toHaveLength(3);
    expect(plantCategories.every((category) => category.plants.length >= 6)).toBe(true);
    expect(new Set(plantCategories.flatMap((category) => category.plants.map((p) => p.id))).size).toBe(18);
  });
  it('navigates, adds, increments, decrements, checks out, and deletes', async () => {
    const user = userEvent.setup();
    const store = createAppStore();
    render(<Provider store={store}><App /></Provider>);
    await user.click(screen.getByRole('button', { name: /Get Started/ }));
    const addButton = await screen.findByRole('button', { name: 'Add Monstera Deliciosa to cart' });
    await user.click(addButton);
    expect(screen.getByRole('button', { name: 'Monstera Deliciosa added to cart' }).disabled).toBe(true);
    await user.click(screen.getByRole('link', { name: 'Cart, 1 items' }));
    await screen.findByRole('heading', { name: 'Shopping Cart' });
    await user.click(screen.getByRole('button', { name: 'Increase Monstera Deliciosa quantity' }));
    expect(screen.getByRole('link', { name: 'Cart, 2 items' })).toBeTruthy();
    const summary = screen.getByRole('complementary', { name: 'Order summary' });
    expect(within(summary).getByText('$56.00')).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Decrease Monstera Deliciosa quantity' }));
    expect(within(summary).getByText('$28.00')).toBeTruthy();
    await user.click(screen.getByRole('button', { name: /Checkout/ }));
    expect(within(summary).getByRole('status').textContent).toContain('Coming Soon!');
    await user.click(screen.getByRole('button', { name: 'Delete Monstera Deliciosa' }));
    expect(screen.getByText(/Your cart is empty/)).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Cart, 0 items' })).toBeTruthy();
    await user.click(screen.getByRole('button', { name: /Continue Shopping/ }));
    expect((await screen.findByRole('button', { name: 'Add Monstera Deliciosa to cart' })).disabled).toBe(false);
  });
  it('removes the last unit with decrement and supports Home navigation', async () => {
    window.location.hash = 'cart';
    const store = createAppStore();
    store.dispatch(addItem(monstera));
    const user = userEvent.setup();
    render(<Provider store={store}><App /></Provider>);
    await user.click(screen.getByRole('button', { name: 'Decrease Monstera Deliciosa quantity' }));
    expect(screen.getByText(/Your cart is empty/)).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Cart, 0 items' })).toBeTruthy();
    await user.click(screen.getByRole('link', { name: 'Home', exact: true }));
    await screen.findByRole('heading', { name: 'Welcome to Paradise Nursery' });
    await user.click(screen.getByRole('button', { name: /Get Started/ }));
    expect((await screen.findByRole('button', { name: 'Add Monstera Deliciosa to cart' })).disabled).toBe(false);
  });
});
