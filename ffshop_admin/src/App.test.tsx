import React from 'react';
import { render, screen } from '@testing-library/react';
import SetTheme from './theme/SetTheme';

test('renders learn react link', () => {
  render(<SetTheme />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
