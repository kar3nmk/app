import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterPanel from './FilterPanel';

describe('FilterPanel Component', () => {
  const mockFilters = {
    category: null,
    brand: null,
    minPrice: null,
    maxPrice: null,
    minRating: null,
  };

  const mockFilterOptions = {
    categories: ['Electronics', 'Footwear', 'Clothing'],
    brands: ['Brand A', 'Brand B', 'Brand C'],
    priceRange: { min: 30, max: 500 },
    ratingRange: { min: 3.5, max: 4.8 },
  };

  const mockOnFilterChange = jest.fn();
  const mockOnClearFilters = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all filter sections', () => {
    render(
      <FilterPanel
        filters={mockFilters}
        filterOptions={mockFilterOptions}
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
      />,
    );

    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByLabelText('Category')).toBeInTheDocument();
    expect(screen.getByLabelText('Brand')).toBeInTheDocument();
  });

  test('calls onFilterChange when category is selected', () => {
    render(
      <FilterPanel
        filters={mockFilters}
        filterOptions={mockFilterOptions}
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
      />,
    );

    const categorySelect = screen.getByLabelText('Category');
    fireEvent.change(categorySelect, { target: { value: 'Electronics' } });

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...mockFilters,
      category: 'Electronics',
    });
  });

  test('shows clear filters button when filters are active', () => {
    const activeFilters = {
      ...mockFilters,
      category: 'Electronics',
    };

    render(
      <FilterPanel
        filters={activeFilters}
        filterOptions={mockFilterOptions}
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
      />,
    );

    const clearButton = screen.getByText('Clear All');
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);
    expect(mockOnClearFilters).toHaveBeenCalled();
  });
});
