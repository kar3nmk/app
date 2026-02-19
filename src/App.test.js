import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import * as api from './services/api';

jest.mock('./services/api');

describe('App Component', () => {
  beforeEach(() => {
    api.fetchFilters.mockResolvedValue({
      categories: ['Electronics', 'Footwear', 'Clothing'],
      brands: ['Brand A', 'Brand B', 'Brand C'],
      priceRange: { min: 30, max: 500 },
      ratingRange: { min: 3.5, max: 4.8 },
    });

    api.fetchProducts.mockResolvedValue({
      data: [
        {
          id: 1,
          name: 'Test Product',
          category: 'Electronics',
          brand: 'Brand A',
          price: 99.99,
          rating: 4.5,
          imageUrl: 'https://picsum.photos/300/200',
        },
      ],
      pagination: {
        page: 1,
        limit: 12,
        total: 1,
        totalPages: 1,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('loads and displays products', async () => {
    render(<App />);

    await waitFor(() => {
      expect(api.fetchProducts).toHaveBeenCalled();
      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });
  });

  test('displays loading state initially', () => {
    render(<App />);
    expect(screen.getByText('Loading products...')).toBeInTheDocument();
  });
});
