import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cookies from 'js-cookie';
import './index.css';

class Sales extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [], cart: {} };
  }

  async componentDidMount() {
    try {
      const res = await fetch('https://fakestoreapi.com/products?limit=20');
      let data = await res.json();

      data = data.map((p) => {
        const discount = Math.floor(Math.random() * 40) + 10;
        const discountedPrice = (p.price * (1 - discount / 100)).toFixed(2);
        return { ...p, discount, discountedPrice };
      });

      const cart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : {};

      this.setState({ products: data, cart });
    } catch (err) {
      console.error('Error loading products:', err);
    }
  }

  updateCart = (productId, change) => {
    const cart = { ...this.state.cart };
    if (change > 0) {
      cart[productId] = cart[productId] ? cart[productId] + change : change;
    } else if (cart[productId]) {
      cart[productId] += change; // change is negative
      if (cart[productId] <= 0) delete cart[productId];
    }
    Cookies.set('cart', JSON.stringify(cart), { expires: 7 });
    this.setState({ cart });
  };

  render() {
    const { products, cart } = this.state;

    return (
      <>
        <Header />
        <main className="sales-page">
          <div className="sales-header">
            <h1>🔥 Big Sale is Live!</h1>
            <p>Grab your favorite products at up to 50% OFF!</p>
          </div>

          <section className="productsGrid">
            {products.length > 0 ? (
              products.map((p) => (
                <div className="product-card sale" key={p.id}>
                  <div className="image-container">
                    <img src={p.image} alt={p.title} />
                    <div className="discount-badge">-{p.discount}%</div>
                  </div>

                  <h4>{p.title.length > 50 ? p.title.slice(0, 50) + '...' : p.title}</h4>

                  <div className="price-section">
                    <span className="old-price">${p.price.toFixed(2)}</span>
                    <span className="new-price">${p.discountedPrice}</span>
                  </div>

                  <div className="cart-controls">
                    <button
                      onClick={() => this.updateCart(p.id, -1)}
                      disabled={!cart[p.id]}
                    >
                      -
                    </button>
                    <span>{cart[p.id] || 0}</span>
                    <button onClick={() => this.updateCart(p.id, 1)}>+</button>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading products...</p>
            )}
          </section>
        </main>
        <Footer />
      </>
    );
  }
}

export default Sales;
