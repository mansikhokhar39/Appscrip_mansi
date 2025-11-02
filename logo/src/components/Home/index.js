import React from "react";
import Cookies from "js-cookie";
import Filters from "./Filters";
import ProductCard from "./ProductCard";

const PRODUCTS = [
  {
    id: 1,
    title: "PPXOC MILKYWAY DRESS IN BLACK",
    image: "https://cdn.pixabay.com/photo/2017/08/10/22/56/bag-2618425_960_720.jpg",
    customizable: true,
    idealFor: "Men",
    occasion: "Casual",
    fabric: "Cotton",
    price: 45.99,
  },
  {
    id: 2,
    title: "Yellow Toy Duck",
    image: "https://cdn.pixabay.com/photo/2016/11/22/19/02/toy-1850428_960_720.jpg",
    customizable: false,
    idealFor: "Kids",
    occasion: "Casual",
    fabric: "Plastic",
    price: 12.5,
  },
  {
    id: 3,
    title: "Leather Keychain",
    image: "https://cdn.pixabay.com/photo/2017/11/06/17/13/keychain-2926228_960_720.jpg",
    customizable: false,
    idealFor: "Women",
    occasion: "Formal",
    fabric: "Leather",
    price: 25.0,
  },
];

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: PRODUCTS, sortBy: "", searchTerm: "" };
  }

  handleSortChange = (e) => this.setState({ sortBy: e.target.value });
  handleSearchChange = (e) => this.setState({ searchTerm: e.target.value });

  addToCart = (productId) => {
    const cart = Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : {};
    cart[productId] = cart[productId] ? cart[productId] + 1 : 1;
    Cookies.set("cart", JSON.stringify(cart), { expires: 7 });
    this.props.updateCartCount();
  };

  removeFromCart = (productId) => {
    const cart = Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : {};
    if (cart[productId]) {
      delete cart[productId];
      Cookies.set("cart", JSON.stringify(cart), { expires: 7 });
      this.props.updateCartCount();
    }
  };

  filteredProducts = () => {
    const { products, sortBy, searchTerm } = this.state;
    let filtered = products.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (sortBy === "lowHigh") filtered.sort((a, b) => a.price - b.price);
    if (sortBy === "highLow") filtered.sort((a, b) => b.price - a.price);
    return filtered;
  };

  render() {
    const filtered = this.filteredProducts();
    return (
      <main className="main-content">
        <h1>DISCOVER OUR PRODUCTS</h1>
        <p>Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus
scelerisque. Dolor integer scelerisque nibh amet mi ut elementum dolor.</p>

        <div className="top-controls">
          <input
            type="text"
            placeholder="Search products..."
            value={this.state.searchTerm}
            onChange={this.handleSearchChange}
          />
          <select value={this.state.sortBy} onChange={this.handleSortChange}>
            <option value="">Sort by</option>
            <option value="lowHigh">Price: Low to High</option>
            <option value="highLow">Price: High to Low</option>
          </select>
        </div>

        <div className="content-area">
          <Filters />
          <section className="products-grid">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={this.addToCart}
                removeFromCart={this.removeFromCart}
              />
            ))}
          </section>
        </div>
      </main>
    );
  }
}

export default Home;