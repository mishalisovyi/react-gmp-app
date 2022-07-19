import React, { ReactNode, ReactPortal } from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Icon } from 'common/constants';

import { PopupConfirmation } from './PopupConfirmation';

const handlePopupConfirming = jest.fn();
const handlePopupClosing = jest.fn();

beforeAll(() => {
  ReactDOM.createPortal = (node: ReactNode): ReactPortal => node as ReactPortal;
});

it('should render confirmation popup', () => {
  const tree = renderer.create(<PopupConfirmation title="test title" message="test message" onConfirm={handlePopupConfirming} onClose={handlePopupClosing} />);

  expect(tree.toJSON()).toMatchSnapshot();
});

it('should handle confirmation popup confirming', async () => {
  render(<PopupConfirmation title="test title" message="test message" onConfirm={handlePopupConfirming} onClose={handlePopupClosing} />);

  await userEvent.click(screen.getByText('Confirm'));

  expect(handlePopupConfirming).toHaveBeenCalled();
});

it('should handle confirmation popup closing', async () => {
  render(<PopupConfirmation title="test title" message="test message" onConfirm={handlePopupConfirming} onClose={handlePopupClosing} />);

  await userEvent.click(screen.getByText(Icon.MULTIPLICATION_X));

  expect(handlePopupClosing).toHaveBeenCalled();
});
