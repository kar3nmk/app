import React from 'react';
import PropTypes from 'prop-types';
import { getPageNumbers } from '@/helpers';
import './Pagination.css';

const Pagination = ({ pagination, onPageChange }) => {
  const { page, totalPages } = pagination;

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination">
      <button
        type="button"
        className="pagination-btn"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        ← Previous
      </button>

      <div className="pagination-numbers">
        {getPageNumbers(page, totalPages).map((pageNum) => {
          if (pageNum === 'ellipsis-start' || pageNum === 'ellipsis-end') {
            return (
              <span key={`ellipsis-${pageNum}-${page}-${totalPages}`} className="pagination-ellipsis">
                ...
              </span>
            );
          }

          return (
            <button
              type="button"
              key={pageNum}
              className={`pagination-number ${
                pageNum === page ? 'active' : ''
              }`}
              onClick={() => onPageChange(pageNum)}
              aria-label={`Page ${pageNum}`}
              aria-current={pageNum === page ? 'page' : undefined}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="pagination-btn"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        Next →
      </button>
    </div>
  );
};

Pagination.propTypes = {
  pagination: PropTypes.shape({
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
  }).isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
