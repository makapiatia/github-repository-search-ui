import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Page renders with title', () => {
  render(<App />);
  const titleElement = screen.getByText(/GitHub Repository Search/i);
  expect(titleElement).toBeInTheDocument();
});
