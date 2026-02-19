import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from '@/components/ProductCard/ProductCard';
import Loading from '@/components/Loading/Loading';
import Error from '@/components/Error/Error';
import './ProductList.css';

const ProductList = ({ products, loading, error }) => {
  if (loading) {
    return <Loading message="Loading products..." />;
  }

  if (error) {
    return <Error message="Error loading products. Please try again." />;
  }

  if (!products || products.length === 0) {
    return (
      <div className="product-list-empty">
        <p>No products found. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      imageUrl: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    }),
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

ProductList.defaultProps = {
  error: null,
};

export default ProductList;
