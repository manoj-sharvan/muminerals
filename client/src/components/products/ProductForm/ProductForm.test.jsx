import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ProductForm from './ProductForm';

describe('ProductForm', () => {
  it('validates product name is required', async () => {
    render(<ProductForm />);
    fireEvent.click(screen.getByText('Submit'));

    const errorMessage = await screen.findByText('Product name is required');
    expect(errorMessage).toBeInTheDocument();
  });

  it('validates HSN code format', async () => {
    render(<ProductForm />);
    const hsnCodeInput = screen.getByLabelText('HSN Code');

    // Invalid input
    fireEvent.input(hsnCodeInput, { target: { value: '12345' } });
    fireEvent.click(screen.getByText('Submit'));

    const errorMessage = await screen.findByText('Enter a valid 6-digit HSN code');
    expect(errorMessage).toBeInTheDocument();

    // Valid input
    fireEvent.input(hsnCodeInput, { target: { value: '123456' } });
    fireEvent.click(screen.getByText('Submit'));

    expect(screen.queryByText('Enter a valid 6-digit HSN code')).not.toBeInTheDocument();
  });

  // Add more test cases as needed for other validations or scenarios
});
