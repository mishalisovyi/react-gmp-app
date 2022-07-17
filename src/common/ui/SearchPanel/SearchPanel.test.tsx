import React from 'react';
import renderer from 'react-test-renderer';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SearchPanel } from './SearchPanel';

const handleSearch = jest.fn();

it('should render search panel', () => {
  const tree = renderer.create(<SearchPanel labelText="test label" value="test value" onSearch={handleSearch} />);

  expect(tree.toJSON()).toMatchSnapshot();
});

it('should handle search', async () => {
  const { container } = render(<SearchPanel labelText="test label" value="test value" onSearch={handleSearch} />);

  const [inputElement] = container.getElementsByTagName('input');

  const searchTerm = 'test string';

  await userEvent.clear(inputElement);
  await userEvent.type(inputElement, searchTerm);
  await userEvent.click(screen.getByText('Search'));

  expect(handleSearch).toHaveBeenCalledWith(searchTerm);
});
