import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination Component', () => {
  const mockPagination = {
    page: 1,
    limit: 12,
    total: 50,
    totalPages: 5,
  };

  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders pagination controls', () => {
    render(
      <Pagination pagination={mockPagination} onPageChange={mockOnPageChange} />,
    );

    expect(screen.getByLabelText('Previous page')).toBeInTheDocument();
    expect(screen.getByLabelText('Next page')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('disables previous button on first page', () => {
    render(
      <Pagination pagination={mockPagination} onPageChange={mockOnPageChange} />,
    );

    const prevButton = screen.getByLabelText('Previous page');
    expect(prevButton).toBeDisabled();
  });

  test('disables next button on last page', () => {
    const lastPagePagination = {
      ...mockPagination,
      page: 5,
    };

    render(
      <Pagination
        pagination={lastPagePagination}
        onPageChange={mockOnPageChange}
      />,
    );

    const nextButton = screen.getByLabelText('Next page');
    expect(nextButton).toBeDisabled();
  });

  test('calls onPageChange when page number is clicked', () => {
    render(
      <Pagination pagination={mockPagination} onPageChange={mockOnPageChange} />,
    );

    const pageButton = screen.getByText('2');
    fireEvent.click(pageButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  test('does not render when totalPages is 1 or less', () => {
    const singlePagePagination = {
      ...mockPagination,
      totalPages: 1,
    };

    const { container } = render(
      <Pagination
        pagination={singlePagePagination}
        onPageChange={mockOnPageChange}
      />,
    );

    expect(container.firstChild).toBeNull();
  });
});
