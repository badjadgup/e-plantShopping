import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItems, selectCartQuantity } from './CartSlice.jsx';

const plant = (id, name, price, description) => ({ id, name, price, description, image: `${import.meta.env.BASE_URL}plants/${id}.svg` });

// Six different houseplants in each of three categories.
export const plantCategories = [
  { name: 'Statement foliage', description: 'Beautiful shapes. A fresh perspective.', plants: [
    plant('monstera', 'Monstera Deliciosa', 28, 'Bold, split leaves for a bright corner.'),
    plant('rubber', 'Rubber Plant', 26, 'Glossy, deep green leaves with a sculptural shape.'),
    plant('fiddle', 'Fiddle Leaf Fig', 35, 'Large, violin-shaped leaves that make an entrance.'),
    plant('bird', 'Bird of Paradise', 38, 'Broad tropical leaves with an upright silhouette.'),
    plant('calathea', 'Calathea Orbifolia', 24, 'Soft silver stripes on rounded green leaves.'),
    plant('philodendron', 'Heartleaf Philodendron', 18, 'Heart-shaped foliage with gently trailing stems.'),
  ] },
  { name: 'Easy-care favourites', description: 'Good company for new plant parents.', plants: [
    plant('snake', 'Snake Plant', 20, 'Tall, patterned leaves and an easygoing nature.'),
    plant('zz', 'ZZ Plant', 25, 'Glossy leaflets on elegant arching stems.'),
    plant('pothos', 'Golden Pothos', 16, 'Golden-flecked leaves and cascading vines.'),
    plant('spider', 'Spider Plant', 15, 'A fountain of slender, striped leaves.'),
    plant('jade', 'Jade Plant', 19, 'Rounded succulent leaves on sturdy stems.'),
    plant('aloe', 'Aloe Vera', 17, 'A sun-loving succulent with sculptural leaves.'),
  ] },
  { name: 'Fragrant & kitchen greens', description: 'A little scent. A little flavour.', plants: [
    plant('lavender', 'Lavender', 22, 'Purple flower spikes with a familiar floral scent.'),
    plant('rosemary', 'Rosemary', 14, 'Fine, aromatic leaves for a sunny windowsill.'),
    plant('mint', 'Spearmint', 12, 'Fresh-scented leaves for your kitchen garden.'),
    plant('basil', 'Sweet Basil', 12, 'Tender, fragrant green leaves for a bright spot.'),
    plant('jasmine', 'Arabian Jasmine', 27, 'Small white blooms with a rich floral fragrance.'),
    plant('thyme', 'Lemon Thyme', 13, 'Tiny leaves with a delicate citrus aroma.'),
  ] },
];

export const formatMoney = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

export default function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectCartQuantity);
  const addedIds = new Set(cartItems.map((item) => item.id));
  return (
    <main className="catalog container" id="main-content" tabIndex={-1}>
      <div className="page-intro">
        <div><p className="eyebrow">THE PLANT COLLECTION</p><h1>Find your kind of green.</h1>
          <p>Thoughtfully selected houseplants for every corner of home.</p></div>
        <p className="collection-count">18 plants / 3 collections</p>
      </div>
      <div className="catalog-toolbar"><span>Explore the collection</span>
        <a href="#cart" aria-live="polite">Your cart: {totalQuantity} {totalQuantity === 1 ? 'plant' : 'plants'} →</a></div>
      {plantCategories.map((category, categoryIndex) => (
        <section className="plant-category" key={category.name} aria-labelledby={`category-${categoryIndex}`}>
          <div className="category-heading"><span className="section-number">0{categoryIndex + 1}</span>
            <div><h2 id={`category-${categoryIndex}`}>{category.name}</h2><p>{category.description}</p></div></div>
          <div className="plant-grid">{category.plants.map((plant) => {
            const isAdded = addedIds.has(plant.id);
            return (
              <article className="plant-card" key={plant.id}>
                <div className="plant-image"><img src={plant.image} alt={plant.name} loading="lazy" width="400" height="400" /></div>
                <div className="plant-card-heading"><h3>{plant.name}</h3><span>{formatMoney(plant.price)}</span></div>
                <p>{plant.description}</p>
                <button className="add-button" disabled={isAdded} onClick={() => dispatch(addItem(plant))}
                  aria-label={isAdded ? `${plant.name} added to cart` : `Add ${plant.name} to cart`}>
                  {isAdded ? 'Added to Cart ✓' : 'Add to Cart +'}
                </button>
              </article>
            );
          })}</div>
        </section>
      ))}
    </main>
  );
}
