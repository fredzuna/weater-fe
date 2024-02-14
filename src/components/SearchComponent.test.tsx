import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SearchComponent from './SearchComponent';

describe('SearchComponent', () => {
  test('renders correctly', () => {
    const { getByLabelText, getByText } = render(<SearchComponent onSearch={() => {}} isLoading={false} />);
    
    expect(getByLabelText('Search Weather')).toBeInTheDocument();
    expect(getByText('Search')).toBeInTheDocument();
  });

  test('handles search correctly', async () => {
    const onSearchMock = jest.fn();
    const { getByLabelText, getByText } = render(<SearchComponent onSearch={onSearchMock} isLoading={false} />);
    
    const searchInput = getByLabelText('Search Weather');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    const searchButton = getByText('Search');
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(onSearchMock).toHaveBeenCalledWith('test');
    });
  });

  test('prevents default form submission', async () => {
    const onSearchMock = jest.fn();
    const { getByText } = render(<SearchComponent onSearch={onSearchMock} isLoading={false} />);
    
    const searchButton = getByText('Search');
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(onSearchMock).not.toHaveBeenCalled();
    });
  });
});
