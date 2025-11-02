import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // fixed Switch → Routes

import Header from "./components/Header";

import Footer from "./components/Footer";
import Skills from "./components/Skills";
import Stories from "./components/Stories";


import Cookies from "js-cookie"; // correct import

import "./App.css"; // single global css



const PRODUCTS = [
  { id: 1, title: "Leather Bag", image: "https://source.unsplash.com/400x400/?leather-bag", stock: 10, price: 45.99 },
  { id: 2, title: "Yellow Toy Duck", image: "https://source.unsplash.com/400x400/?toy-duck", stock: 0, price: 12.5 },
  { id: 3, title: "Leather Keychain", image: "https://source.unsplash.com/400x400/?keychain", stock: 5, price: 25.0 },
  { id: 4, title: "Stylish Watch", image: "https://source.unsplash.com/400x400/?watch", stock: 7, price: 89.99 },
  { id: 5, title: "Fashion Jacket", image: "https://source.unsplash.com/400x400/?jacket", stock: 4, price: 120.0 },
  { id: 6, title: "Sneakers", image: "https://source.unsplash.com/400x400/?sneakers", stock: 12, price: 59.99 },
  { id: 7, title: "Handbag", image: "https://source.unsplash.com/400x400/?handbag", stock: 8, price: 75.5 },
  { id: 8, title: "Sunglasses", image: "https://source.unsplash.com/400x400/?sunglasses", stock: 15, price: 35.0 },
  { id: 9, title: "Blue Jeans", image: "https://source.unsplash.com/400x400/?jeans", stock: 9, price: 49.0 },
  { id: 10, title: "Classic Hat", image: "https://source.unsplash.com/400x400/?hat", stock: 13, price: 20.0 },
  { id: 11, title: "Bracelet", image: "https://source.unsplash.com/400x400/?bracelet", stock: 11, price: 39.99 },
  { id: 12, title: "Wallet", image: "https://source.unsplash.com/400x400/?wallet", stock: 20, price: 29.99 },
  { id: 13, title: "Perfume", image: "https://source.unsplash.com/400x400/?perfume", stock: 14, price: 55.0 },
  { id: 14, title: "Travel Backpack", image: "https://source.unsplash.com/400x400/?backpack", stock: 6, price: 65.0 },
  { id: 15, title: "Sports Cap", image: "https://source.unsplash.com/400x400/?cap", stock: 17, price: 18.99 },
  { id: 16, title: "Cotton Shirt", image: "https://source.unsplash.com/400x400/?shirt", stock: 22, price: 35.0 },
  { id: 17, title: "High Heels", image: "https://source.unsplash.com/400x400/?high-heels", stock: 9, price: 95.0 },
  { id: 18, title: "Sports Watch", image: "https://source.unsplash.com/400x400/?sports-watch", stock: 8, price: 85.0 },
  { id: 19, title: "Scarf", image: "https://source.unsplash.com/400x400/?scarf", stock: 10, price: 40.0 },
  { id: 20, title: "Laptop Sleeve", image: "https://source.unsplash.com/400x400/?laptop-sleeve", stock: 18, price: 28.0 },
  { id: 21, title: "Baby Shoes", image: "https://source.unsplash.com/400x400/?baby-shoes", stock: 12, price: 25.0 },
  { id: 22, title: "Men’s Belt", image: "https://source.unsplash.com/400x400/?belt", stock: 7, price: 30.0 },
  { id: 23, title: "Smartphone Case", image: "https://source.unsplash.com/400x400/?phone-case", stock: 16, price: 15.0 },
  { id: 24, title: "Headphones", image: "https://source.unsplash.com/400x400/?headphones", stock: 10, price: 65.0 },
  { id: 25, title: "Coffee Mug", image: "https://source.unsplash.com/400x400/?coffee-mug", stock: 14, price: 12.99 },
];



class App extends React.Component {

  constructor(props) {

    super(props);

    this.state = {

      expandedFilters: {},

      filters: {

        customizable: false,

        idealFor: [],

        occasion: [],

        work: [],

        fabric: [],

        segment: [],

        suitableFor: [],

        rawMaterials: [],

        pattern: [],

      },

      sortBy: "",

      searchTerm: "",

      cartCount: 0,

    };

  }



  componentDidMount() {

    this.updateCartCount();

  }



  toggleExpand = (key) => {

    this.setState((prev) => ({

      expandedFilters: {

        ...prev.expandedFilters,

        [key]: !prev.expandedFilters[key],

      },

    }));

  };



  toggleCheckbox = (key, value) => {

    if (key === "customizable") {

      this.setState((prev) => ({

        filters: { ...prev.filters, customizable: !prev.filters.customizable },

      }));

      return;

    }

    this.setState((prev) => {

      const current = prev.filters[key];

      const updated = current.includes(value)

        ? current.filter((v) => v !== value)

        : [...current, value];

      return { filters: { ...prev.filters, [key]: updated } };

    });

  };



  unselectAll = (key) => {

    this.setState((prev) => ({

      filters: { ...prev.filters, [key]: [] },

    }));

  };



  handleSortChange = (e) => this.setState({ sortBy: e.target.value });

  handleSearchChange = (value) => this.setState({ searchTerm: value });



  addToCart = (productid) => {

    const cart = Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : {};

    cart[productid] = cart[productid] ? cart[productid] + 1 : 1;

    Cookies.set("cart", JSON.stringify(cart), { expires: 7 });

    this.updateCartCount();

  };



  removeFromCart = (productid) => {

    const cart = Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : {};

    if (cart[productid]) {

      delete cart[productid];

      Cookies.set("cart", JSON.stringify(cart), { expires: 7 });

      this.updateCartCount();

    }

  };



  updateCartCount = () => {

    const cart = Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : {};

    const count = Object.values(cart).reduce((acc, qty) => acc + qty, 0);

    this.setState({ cartCount: count });

  };



  filteredProducts = () => {

    const { filters, sortBy, searchTerm } = this.state;

    let result = PRODUCTS.filter((p) => {

      if (filters.customizable && !p.customizable) return false;

      for (const key in filters) {

        if (key !== "customizable" && filters[key].length > 0) {

          if (!filters[key].includes(p[key])) return false;

        }

      }

      return p.title.toLowerCase().includes(searchTerm.toLowerCase());

    });



    if (sortBy === "lowHigh") result.sort((a, b) => a.price - b.price);

    if (sortBy === "highLow") result.sort((a, b) => b.price - a.price);



    return result;

  };



  renderFilters = () => {

    const filterConfig = [

      { key: "idealFor", label: "IDEAL FOR", options: ["Men", "Women", "Baby & Kids"] },

      { key: "occasion", label: "OCCASION", options: ["Casual", "Formal", "Sports"] },

      { key: "work", label: "WORK", options: ["Remote", "Office", "Outdoor"] },

      { key: "fabric", label: "FABRIC", options: ["Cotton", "Leather", "Polyester"] },

      { key: "segment", label: "SEGMENT", options: ["Kids", "Adults"] },

      { key: "suitableFor", label: "SUITABLE FOR", options: ["Travel", "Work", "School"] },

      { key: "rawMaterials", label: "RAW MATERIALS", options: ["Plastic", "Metal", "Wood"] },

      { key: "pattern", label: "PATTERN", options: ["Striped", "Plain", "Checkered"] },

    ];



    return (

      <aside className="sidebar">

        <h3>{PRODUCTS.length} ITEMS</h3>

        <label>

          <input

            type="checkbox"

            checked={this.state.filters.customizable}

            onChange={() => this.toggleCheckbox("customizable")}

          />{" "}

          CUSTOMIZABLE

        </label>



        {filterConfig.map(({ key, label, options }) => (

          <div className="filter-section" key={key}>

            <button

              className="filter-header"

              onClick={() => this.toggleExpand(key)}

            >

              {label} {this.state.expandedFilters[key] ? "▲" : "▼"}

            </button>



            {this.state.expandedFilters[key] && (

              <div className="filter-options">

                <button

                  className="unselect-btn"

                  onClick={() => this.unselectAll(key)}

                >

                  Unselect All

                </button>

                {options.map((opt) => (

                  <label key={opt}>

                    <input

                      type="checkbox"

                      checked={this.state.filters[key].includes(opt)}

                      onChange={() => this.toggleCheckbox(key, opt)}

                    />

                    {opt}

                  </label>

                ))}

              </div>

            )}

          </div>

        ))}

      </aside>

    );

  };



  renderHome = () => {

    const filtered = this.filteredProducts();

    const cart = Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : {};



    return (

      <main className="main-content">

        <h1>DISCOVER OUR PRODUCTS</h1>

        <div className="top-controls">

          <input

            type="text"

            placeholder="Search products..."

            value={this.state.searchTerm}

            onChange={(e) => this.handleSearchChange(e.target.value)}

          />

          <select value={this.state.sortBy} onChange={this.handleSortChange}>

            <option value="">Sort by</option>

            <option value="lowHigh">Price: Low to High</option>

            <option value="highLow">Price: High to Low</option>

          </select>

        </div>



        <div className="content-area">

          {this.renderFilters()}



          <section className="products-grid">

            {filtered.length > 0 ? (

              filtered.map((p) => (

                <div className="product-card" key={p.id}>

                  <img src={p.image} alt={p.title} />

                  {p.stock === 0 && <div className="out-of-stock">OUT OF STOCK</div>}

                  <h4>{p.title}</h4>

                  <p>${p.price.toFixed(2)}</p>

                  <div className="product-actions">

                    <button onClick={() => this.addToCart(p.id)}>Add to Cart</button>

                    {cart[p.id] && (

                      <button onClick={() => this.removeFromCart(p.id)}>Remove</button>

                    )}

                  </div>

                  {cart[p.id] && <p>Qty: {cart[p.id]}</p>}

                </div>

              ))

            ) : (

              <p>No products found.</p>

            )}

          </section>

        </div>

      </main>

    );

  };



  renderCart = () => {

    const cart = Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : {};

    const cartItems = PRODUCTS.filter((p) => cart[p.id]);

    return (

      <main className="main-content">

        <h1>Your Cart</h1>

        {cartItems.length ? (

          <ul>

            {cartItems.map((p) => (

              <li key={p.id}>

                {p.title} - Qty: {cart[p.id]}

              </li>

            ))}

          </ul>

        ) : (

          <p>Your cart is empty.</p>

        )}

      </main>

    );

  };



  renderAbout = () => (

    <main className="main-content">

      <h1>About Us</h1>
      <p>
        Welcome to our store! We offer a wide range of handcrafted and
        high-quality products designed to make your life easier and more stylish.
      </p>
      <p>
        Each product is carefully selected for quality, design, and usability.
        We aim to bring you the best online shopping experience possible.
      </p>

    </main>

  );



  renderContact = () => (

    <main className="main-content">

      <main className="contact-page">
      <h1>Contact Us</h1>
      <p>If you have any questions, feel free to reach out!</p>
      <div className="contact-info">
        <p>Email: support@example.com</p>
        <p>Phone: +91 9876543210</p>
        <p>Address: 123 Shopping Lane, New Delhi, India</p>
      </div>
      <form className="contact-form">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" required />
        <button type="submit">Send Message</button>
      </form>
    </main>
    </main>

  );



  render() {

    return (

      <Router>

        <Header

          searchTerm={this.state.searchTerm}

          setSearchTerm={this.handleSearchChange}

          cartCount={this.state.cartCount}

        />

       
        {/* Fixed Switch → Routes + element syntax */}

        <Routes>

          <Route path="/" element={this.renderHome()} />
          <Route path="/skills" element={<Skills />} />      
          <Route path="/stories" element={<Stories />} /> 

          <Route path="/cart" element={this.renderCart()} />

          <Route path="/about" element={this.renderAbout()} />

          <Route path="/contact" element={this.renderContact()} />

        </Routes>



        <Footer />

      </Router>

    );

  }

}



export default App;