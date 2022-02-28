import React from 'react';
import { render, screen } from '@testing-library/react';
import Search from './Search';

test('Search bar renders with placeholder text', () => {
  render(<Search />);
  const placeHolderText = screen.queryByPlaceholderText(/Search by GitHub user.../i);
  expect(placeHolderText).toBeInTheDocument();
});
