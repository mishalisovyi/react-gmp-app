import React from 'react';
import renderer from 'react-test-renderer';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { Icon } from 'common/constants';

import { DropdownMenu } from './DropdownMenu';

const menuItems = ['item 1', 'item 2'];
const menuTargetText = 'menu target';
const optionClickedHandler = jest.fn();

it('should render dropdown menu target element', () => {
  const tree = renderer.create(
    <DropdownMenu items={menuItems} onOptionClicked={optionClickedHandler}>
      <div>{menuTargetText}</div>
    </DropdownMenu>,
  );

  expect(tree.toJSON()).toMatchSnapshot();
});

it('should handle dropdown menu opening', async () => {
  render(
    <DropdownMenu items={menuItems} onOptionClicked={optionClickedHandler}>
      <div>{menuTargetText}</div>
    </DropdownMenu>,
  );

  await userEvent.click(screen.getByText(menuTargetText));

  expect(screen.getByText('item 1')).toBeInTheDocument();
});

it('should handle dropdown menu closing', async () => {
  render(
    <DropdownMenu items={menuItems} onOptionClicked={optionClickedHandler}>
      <div>{menuTargetText}</div>
    </DropdownMenu>,
  );

  await userEvent.click(screen.getByText(menuTargetText));
  await userEvent.click(screen.getByText(Icon.MULTIPLICATION_X));

  expect(screen.queryByText('item 1')).toBeNull();
});

it('should handle menu option click', async () => {
  render(
    <DropdownMenu items={menuItems} onOptionClicked={optionClickedHandler}>
      <div>{menuTargetText}</div>
    </DropdownMenu>,
  );

  await userEvent.click(screen.getByText(menuTargetText));
  await userEvent.click(screen.getByText(menuItems[0]));

  expect(optionClickedHandler).toHaveBeenCalledWith(menuItems[0]);
});
