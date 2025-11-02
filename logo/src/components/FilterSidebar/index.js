import React from 'react';
import './index.css'; // Use global CSS

class FilterSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedSections: {
        idealFor: false,
        occasion: false,
        work: false,
        fabric: false,
        segment: false,
        suitableFor: false,
        rawMaterials: false,
        pattern: false,
      },
      selectedFilters: {
        customizable: false,
        idealFor: [],
        occasion: [],
        work: [],
        fabric: [],
        segment: [],
        suitableFor: [],
        rawMaterials: [],
        pattern: [],
      }
    };
  }

  toggleSection = (section) => {
    this.setState((prevState) => ({
      expandedSections: {
        ...prevState.expandedSections,
        [section]: !prevState.expandedSections[section],
      },
    }));
  };

  handleCheckboxChange = (section, value) => {
    this.setState((prevState) => {
      const selected = new Set(prevState.selectedFilters[section] || []);
      if (selected.has(value)) {
        selected.delete(value);
      } else {
        selected.add(value);
      }
      const selectedArr = Array.from(selected);
      if (this.props.onFilterChange) {
        this.props.onFilterChange(section, selectedArr);
      }
      return {
        selectedFilters: {
          ...prevState.selectedFilters,
          [section]: selectedArr,
        },
      };
    });
  };

  renderCheckboxes = (section, options) => {
    const selected = this.state.selectedFilters[section] || [];
    return options.map((opt) => (
      <label key={opt} className="checkbox-label">
        <input
          type="checkbox"
          checked={selected.includes(opt)}
          onChange={() => this.handleCheckboxChange(section, opt)}
        />{' '}
        {opt}
      </label>
    ));
  };

  render() {
    const { expandedSections } = this.state;

    return (
      <aside className="sidebar">
        <div className="sidebar-header">
          <span>FILTERS</span>
          <button
            className="hide-btn"
            onClick={() => this.props.onHide && this.props.onHide()}
            aria-label="Hide Filters"
          >
            &lt; Hide Filter
          </button>
        </div>

        <div className="section">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={this.state.selectedFilters.customizable || false}
              onChange={() => this.handleCheckboxChange('customizable', 'customizable')}
            />{' '}
            CUSTOMIZABLE
          </label>
        </div>

        {[
          { key: 'idealFor', label: 'IDEAL FOR', options: ['Men', 'Women', 'Baby & Kids'] },
          { key: 'occasion', label: 'OCCASION', options: ['Casual', 'Formal', 'Sports'] },
          { key: 'work', label: 'WORK', options: ['Remote', 'Office', 'Outdoor'] },
          { key: 'fabric', label: 'FABRIC', options: ['Cotton', 'Leather', 'Polyester'] },
          { key: 'segment', label: 'SEGMENT', options: ['Kids', 'Adults'] },
          { key: 'suitableFor', label: 'SUITABLE FOR', options: ['Travel', 'Work', 'School'] },
          { key: 'rawMaterials', label: 'RAW MATERIALS', options: ['Plastic', 'Metal', 'Wood'] },
          { key: 'pattern', label: 'PATTERN', options: ['Striped', 'Plain', 'Checkered'] },
        ].map(({ key, label, options }) => (
          <div key={key} className="section">
            <button
              aria-expanded={expandedSections[key]}
              onClick={() => this.toggleSection(key)}
              className="section-header"
            >
              {label} {expandedSections[key] ? '▲' : '▼'}
            </button>
            {expandedSections[key] && (
              <div className="options">
                {this.renderCheckboxes(key, options)}
              </div>
            )}
          </div>
        ))}
      </aside>
    );
  }
}

export default FilterSidebar;