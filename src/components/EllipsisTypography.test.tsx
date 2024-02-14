import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import EllipsisTypography from './EllipsisTypography';

describe('EllipsisTypography Component', () => {
  test('renders text properly', () => {
    const text = 'Hello, World!';
    const { getByText } = render(<EllipsisTypography text={text} />);
    expect(getByText(text)).toBeInTheDocument();
  });

  test('applies styles correctly', () => {
    const text = 'Testing styles';
    const { getByText } = render(<EllipsisTypography text={text} />);
    const typographyElement = getByText(text);

    expect(typographyElement).toHaveStyle({
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    });
  });

});
