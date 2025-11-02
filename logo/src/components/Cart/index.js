import React from "react";
import Cookies from "js-cookie";
import "./index.css";

const PRODUCTS = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Product ${i + 1}`,
  price: (Math.random() * 100 + 10).toFixed(2),
  image: `https://source.unsplash.com/400x400/?product,shopping,${i + 1}`,
}));

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cart: this.getCart() };
  }

  getCart = () => {
    return Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : {};
  };

  updateCart = () => {
    this.setState({ cart: this.getCart() });
    if (this.props.updateCartCount) this.props.updateCartCount();
  };

  addOne = (id) => {
    const cart = { ...this.state.cart };
    cart[id] = cart[id] ? cart[id] + 1 : 1;
    Cookies.set("cart", JSON.stringify(cart), { expires: 7 });
    this.updateCart();
  };

  removeOne = (id) => {
    const cart = { ...this.state.cart };
    if (cart[id]) {
      cart[id] -= 1;
      if (cart[id] <= 0) delete cart[id];
      Cookies.set("cart", JSON.stringify(cart), { expires: 7 });
      this.updateCart();
    }
  };

  removeAll = (id) => {
    const cart = { ...this.state.cart };
    if (cart[id]) {
      delete cart[id];
      Cookies.set("cart", JSON.stringify(cart), { expires: 7 });
      this.updateCart();
    }
  };

  render() {
    const { cart } = this.state;
    const cartItems = PRODUCTS.filter((p) => cart[p.id]);
    const total = cartItems.reduce((sum, p) => sum + p.price * cart[p.id], 0);

    return (
      <main className="cart-page">
        <h1>Your Cart</h1>
        {cartItems.length ? (
          <>
            <ul className="cart-list">
              {cartItems.map((p) => (
                <li key={p.id} className="cart-item">
                  <img src={p.image} alt={p.title} />
                  <div>
                    <h4>{p.title}</h4>
                    <p>${p.price}</p>
                    <div className="cart-controls">
                      <button onClick={() => this.removeOne(p.id)}>-</button>
                      <span>{cart[p.id]}</span>
                      <button onClick={() => this.addOne(p.id)}>+</button>
                      <button onClick={() => this.removeAll(p.id)}>Remove</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <h3>Total: ${total.toFixed(2)}</h3>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </main>
    );
  }
}

export default Cart;
