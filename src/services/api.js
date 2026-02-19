const API_BASE_URL = 'http://localhost:3001';

export const fetchProducts = async (filters = {}) => {
  const {
    page = 1,
    limit = 12,
    category,
    brand,
    minPrice,
    maxPrice,
    minRating,
  } = filters;

  const params = new URLSearchParams();
  params.append('page', page);
  params.append('limit', limit);

  if (category) params.append('category', category);
  if (brand) params.append('brand', brand);
  if (minPrice) params.append('minPrice', minPrice);
  if (maxPrice) params.append('maxPrice', maxPrice);
  if (minRating) params.append('minRating', minRating);

  const response = await fetch(`${API_BASE_URL}/products?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export const fetchFilters = async () => {
  const response = await fetch(`${API_BASE_URL}/filters`);
  if (!response.ok) {
    throw new Error('Failed to fetch filters');
  }
  return response.json();
};
