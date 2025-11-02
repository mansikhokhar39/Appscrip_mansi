import React from "react";
import "./index.css"; // using your normal CSS, not module

class Filters extends React.Component {
  handleSortChange = (e) => {
    if (this.props.setSortBy) this.props.setSortBy(e);
  };

  handleColorChange = (e) => {
    if (this.props.setColorFilter) this.props.setColorFilter(e);
  };

  handleSizeChange = (e) => {
    if (this.props.setSizeFilter) this.props.setSizeFilter(e);
  };

  render() {
    return (
      <div className="filters">
        <select
          aria-label="Sort products"
          value={this.props.sortBy || ""}
          onChange={(e) => this.handleSortChange(e.target.value)}
        >
          <option value="">SORT BY</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
          <option value="newest">Newest First</option>
        </select>

        <select
          aria-label="Filter by color"
          value={this.props.colorFilter || ""}
          onChange={(e) => this.handleColorChange(e.target.value)}
        >
          <option value="">COLORS</option>
          <option value="blue">Blue</option>
          <option value="black">Black</option>
          <option value="white">White</option>
          <option value="brown">Brown</option>
        </select>

        <select
          aria-label="Filter by size"
          value={this.props.sizeFilter || ""}
          onChange={(e) => this.handleSizeChange(e.target.value)}
        >
          <option value="">SIZE</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>

        <select aria-label="Filter by category (Demo)">
          <option value="">FILTER BY</option>
          <option value="bestSellers">Best Sellers</option>
          <option value="newArrivals">New Arrivals</option>
        </select>
      </div>
    );
  }
}

export default Filters;