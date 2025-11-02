import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaSearch, FaHeart, FaShoppingBag, FaUser } from "react-icons/fa";
import './index.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartCount: 0,
      searchTerm: ''
    };
  }

  componentDidMount() {
    this.updateCartCount();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cartCount !== this.props.cartCount) {
      this.updateCartCount();
    }
  }

  updateCartCount = () => {
    const cart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : {};
    const count = Object.values(cart).reduce((a, b) => a + b, 0);
    this.setState({ cartCount: count });
  };

  handleInputChange = (e) => {
    this.setState({ searchTerm: e.target.value });
    if (this.props.setSearchTerm) {
      this.props.setSearchTerm(e.target.value);
    }
  };

  render() {
    return (
      <>
        {/* ✅ Announcement Scroll Bar */}
        <div className="announcement-bar">
          <div className="scroll-text">
            <span>
              Lorem ipsum dolor • Lorem ipsum dolor • Lorem ipsum dolor
            </span>
          </div>
        </div>

        {/* ✅ Main Header */}
        <header className="header">
          <div className="logo">
            <Link to="/">🛍 MyStore</Link>
          </div>

          <nav className="navbar">
            <ul>
              <li><Link to="/">Shop</Link></li>
              <li><Link to="/skills">Skills</Link></li>
              <li><Link to="/stories">Stories</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </nav>

          <div className="header-right">
            <input
              type="search"
              className="search-input"
              placeholder="Search products..."
              value={this.state.searchTerm}
              onChange={this.handleInputChange}
            />

            <div className="icons">
              <FaSearch className="icon" />
              <FaHeart className="icon" />
              <Link to="/cart" className="icon cart">
                <FaShoppingBag />
                <span className="count">{this.state.cartCount}</span>
              </Link>
              <FaUser className="icon" />
            </div>
          </div>
        </header>
      </>
    );
  }
}

export default Header;