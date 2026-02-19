import React, { useState, useEffect, useCallback } from 'react';
import ProductList from '@/components/ProductList/ProductList';
import FilterPanel from '@/components/FilterPanel/FilterPanel';
import Pagination from '@/components/Pagination/Pagination';
import { fetchProducts, fetchFilters } from '@/services/api';
import './App.css';

const parseFiltersFromURL = () => {
  const params = new URLSearchParams(window.location.search);
  const minPrice = params.get('minPrice');
  const maxPrice = params.get('maxPrice');
  const minRating = params.get('minRating');
  return {
    category: params.get('category') || null,
    brand: params.get('brand') || null,
    minPrice: minPrice && !Number.isNaN(Number(minPrice)) ? Number(minPrice) : null,
    maxPrice: maxPrice && !Number.isNaN(Number(maxPrice)) ? Number(maxPrice) : null,
    minRating: minRating && !Number.isNaN(Number(minRating)) ? Number(minRating) : null,
  };
};

const parsePaginationFromURL = () => {
  const params = new URLSearchParams(window.location.search);
  const page = params.get('page');
  const limit = params.get('limit');
  return {
    page: page && !Number.isNaN(Number(page)) && Number(page) > 0 ? Number(page) : 1,
    limit: limit && !Number.isNaN(Number(limit)) && Number(limit) > 0 ? Number(limit) : 12,
    total: 0,
    totalPages: 0,
  };
};

const updateURLParams = (filters, pagination) => {
  const params = new URLSearchParams();

  if (pagination.page > 1) {
    params.set('page', pagination.page.toString());
  }
  if (pagination.limit !== 12) {
    params.set('limit', pagination.limit.toString());
  }

  if (filters.category) params.set('category', filters.category);
  if (filters.brand) params.set('brand', filters.brand);
  if (filters.minPrice !== null) params.set('minPrice', filters.minPrice.toString());
  if (filters.maxPrice !== null) params.set('maxPrice', filters.maxPrice.toString());
  if (filters.minRating !== null) params.set('minRating', filters.minRating.toString());
  
  const newURL = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
  window.history.replaceState({}, '', newURL);
};

const App = () => {
  const [products, setProducts] = useState([]);
  const [filterOptions, setFilterOptions] = useState(null);
  const [filters, setFilters] = useState(() => parseFiltersFromURL());
  const [pagination, setPagination] = useState(() => parsePaginationFromURL());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const options = await fetchFilters();
        setFilterOptions(options);
      } catch (err) {
        console.error('Failed to load filter options:', err);
      }
    };
    loadFilterOptions();
  }, []);

  useEffect(() => {
    updateURLParams(filters, pagination);
  }, [filters, pagination.page, pagination.limit]);

  useEffect(() => {
    const handlePopState = () => {
      const newFilters = parseFiltersFromURL();
      const newPagination = parsePaginationFromURL();
      setFilters(newFilters);
      setPagination((prev) => ({
        ...newPagination,
        total: prev.total,
        totalPages: prev.totalPages,
      }));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchProducts({
          ...filters,
          page: pagination.page,
          limit: pagination.limit,
        });
        setProducts(response.data);
        setPagination((prev) => ({
          ...prev,
          total: response.pagination.total,
          totalPages: response.pagination.totalPages,
        }));
      } catch (err) {
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [filters, pagination.page, pagination.limit]);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({
      category: null,
      brand: null,
      minPrice: null,
      maxPrice: null,
      minRating: null,
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="app">
      <main className="app-main">
        <div className="container">
          <div className="app-content">
            <aside className="app-sidebar">
              <FilterPanel
                filters={filters}
                filterOptions={filterOptions}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </aside>

            <section className="app-products">
              {!loading && products.length > 0 && (
                <div className="results-info">
                  Showing {products.length} of {pagination.total} products
                </div>
              )}
              <ProductList products={products} loading={loading} error={error} />
              <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
