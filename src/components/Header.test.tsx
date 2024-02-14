import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Header from './Header';

test('renders header with correct text', () => {
  const { getByText } = render(<Header />);
  const headerText = getByText('Weather');
  expect(headerText).toBeInTheDocument();
});