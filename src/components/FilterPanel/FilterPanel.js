import React from 'react';
import PropTypes from 'prop-types';
import './FilterPanel.css';

const FilterPanel = ({
  filters,
  filterOptions,
  onFilterChange,
  onClearFilters,
}) => {
  const hasActiveFilters =
    filters.category ||
    filters.brand ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.minRating;

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h2>Filters</h2>
        {hasActiveFilters && (
          <button type="button" className="clear-filters-btn" onClick={onClearFilters}>
            Clear All
          </button>
        )}
      </div>

      <div className="filter-section">
        <label htmlFor="category-filter" className="filter-label">
          Category
          <select
            id="category-filter"
            className="filter-select"
            value={filters.category || ''}
            onChange={(e) =>
              onFilterChange({ ...filters, category: e.target.value || null })
            }
          >
            <option value="">All Categories</option>
            {filterOptions?.categories?.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="filter-section">
        <label htmlFor="brand-filter" className="filter-label">
          Brand
          <select
            id="brand-filter"
            className="filter-select"
            value={filters.brand || ''}
            onChange={(e) =>
              onFilterChange({ ...filters, brand: e.target.value || null })
            }
          >
            <option value="">All Brands</option>
            {filterOptions?.brands?.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="filter-section">
        <label htmlFor="min-price-filter" className="filter-label">
          Price Range: ${filters.minPrice || filterOptions?.priceRange?.min || 0} - ${filters.maxPrice || filterOptions?.priceRange?.max || 0}
        </label>
        <div className="price-inputs">
          <input
            id="min-price-filter"
            type="number"
            className="price-input"
            placeholder="Min"
            min={filterOptions?.priceRange?.min || 0}
            max={filterOptions?.priceRange?.max || 1000}
            value={filters.minPrice || ''}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                minPrice: e.target.value ? Number(e.target.value) : null,
              })
            }
            aria-label="Minimum price"
          />
          <span className="price-separator">-</span>
          <input
            id="max-price-filter"
            type="number"
            className="price-input"
            placeholder="Max"
            min={filterOptions?.priceRange?.min || 0}
            max={filterOptions?.priceRange?.max || 1000}
            value={filters.maxPrice || ''}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                maxPrice: e.target.value ? Number(e.target.value) : null,
              })
            }
            aria-label="Maximum price"
          />
        </div>
      </div>

      <div className="filter-section">
        <label htmlFor="rating-filter" className="filter-label">
          Minimum Rating: {filters.minRating || filterOptions?.ratingRange?.min || 0}+
        </label>
        <div className="rating-filter">
          <input
            id="rating-filter"
            type="range"
            className="rating-slider"
            min={filterOptions?.ratingRange?.min || 0}
            max={filterOptions?.ratingRange?.max || 5}
            step="0.5"
            value={filters.minRating || filterOptions?.ratingRange?.min || 0}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                minRating: Number(e.target.value),
              })
            }
            aria-label="Minimum rating"
          />
          <div className="rating-value-display">
            {filters.minRating || filterOptions?.ratingRange?.min || 0}
          </div>
        </div>
      </div>
    </div>
  );
};

FilterPanel.propTypes = {
  filters: PropTypes.shape({
    category: PropTypes.string,
    brand: PropTypes.string,
    minPrice: PropTypes.number,
    maxPrice: PropTypes.number,
    minRating: PropTypes.number,
  }).isRequired,
  filterOptions: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.string),
    brands: PropTypes.arrayOf(PropTypes.string),
    priceRange: PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number,
    }),
    ratingRange: PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number,
    }),
  }),
  onFilterChange: PropTypes.func.isRequired,
  onClearFilters: PropTypes.func.isRequired,
};

FilterPanel.defaultProps = {
  filterOptions: null,
};

export default FilterPanel;
