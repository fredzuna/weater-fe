import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import TransparentLoader from './TransparentLoader';

describe('TransparentLoader', () => {
  test('renders with backdrop and circular progress when open is true', () => {
    const { getByTestId } = render(<TransparentLoader open={true} />);

    const backdropElement = getByTestId('backdrop-transparent');
    const circularProgressElement = getByTestId('progressbar');

    expect(backdropElement).toBeInTheDocument();
    expect(circularProgressElement).toBeInTheDocument();
  });

  test('does not render when open is false', () => {
    const { container } = render(<TransparentLoader open={false} />);

    expect(container.firstChild).toBeNull();
  });
});
