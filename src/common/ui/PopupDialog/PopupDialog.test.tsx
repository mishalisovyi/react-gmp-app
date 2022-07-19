import React, { ReactNode, ReactPortal } from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Icon } from 'common/constants';

import { PopupDialog } from './PopupDialog';

const handlePrimaryButtonClick = jest.fn();
const handleSecondaryButtonClick = jest.fn();
const handlePopupClosing = jest.fn();

beforeAll(() => {
  ReactDOM.createPortal = (node: ReactNode): ReactPortal => node as ReactPortal;
});

it('should render dialog popup', () => {
  const tree = renderer.create(
    <PopupDialog title="test title" onPrimaryButtonClick={handlePrimaryButtonClick} onSecondaryButtonClick={handleSecondaryButtonClick} onClose={handlePopupClosing}>
      <div>test</div>
    </PopupDialog>,
  );

  expect(tree.toJSON()).toMatchSnapshot();
});

it('should handle dialog popup primary button click', async () => {
  render(
    <PopupDialog title="test title" onPrimaryButtonClick={handlePrimaryButtonClick} onSecondaryButtonClick={handleSecondaryButtonClick} onClose={handlePopupClosing}>
      <div>test</div>
    </PopupDialog>,
  );

  await userEvent.click(screen.getByText('Submit'));

  expect(handlePrimaryButtonClick).toHaveBeenCalled();
});

it('should handle dialog popup secondary button click', async () => {
  render(
    <PopupDialog title="test title" onPrimaryButtonClick={handlePrimaryButtonClick} onSecondaryButtonClick={handleSecondaryButtonClick} onClose={handlePopupClosing}>
      <div>test</div>
    </PopupDialog>,
  );

  await userEvent.click(screen.getByText('Reset'));

  expect(handleSecondaryButtonClick).toHaveBeenCalled();
});

it('should handle dialog popup closing', async () => {
  render(
    <PopupDialog title="test title" onPrimaryButtonClick={handlePrimaryButtonClick} onSecondaryButtonClick={handleSecondaryButtonClick} onClose={handlePopupClosing}>
      <div>test</div>
    </PopupDialog>,
  );

  await userEvent.click(screen.getByText(Icon.MULTIPLICATION_X));

  expect(handlePopupClosing).toHaveBeenCalled();
});
