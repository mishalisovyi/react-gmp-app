import React from 'react';
import renderer from 'react-test-renderer';

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FilterSelectList } from './FilterSelectList';

const selectListOptions = [{
  title: 'Test 1',
  value: 'test 1',
}, {
  title: 'Test 2',
  value: 'test 2',
}];

const selectionChangedHandler = jest.fn();

it('should render select list', () => {
  const tree = renderer.create(
    <FilterSelectList label="test" options={selectListOptions} defaultValue={selectListOptions[0].value} onSelectionChanged={selectionChangedHandler} />,
  );

  expect(tree.toJSON()).toMatchSnapshot();
});

it('should handle option selection', async () => {
  const selectedOptionValue = selectListOptions[1].value;

  const { container } = render(
    <FilterSelectList label="test" options={selectListOptions} defaultValue={selectListOptions[0].value} onSelectionChanged={selectionChangedHandler} />,
  );

  const [select] = container.getElementsByTagName('select');

  await userEvent.selectOptions(select, selectedOptionValue);

  expect(selectionChangedHandler).toHaveBeenCalledWith(selectedOptionValue);
});
