import React, { ReactNode, ReactPortal } from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Icon } from 'common/constants';

import { PopupInfo } from './PopupInfo';

const handlePopupClosing = jest.fn();

beforeAll(() => {
  ReactDOM.createPortal = (node: ReactNode): ReactPortal => node as ReactPortal;
});

it('should render info popup', () => {
  const tree = renderer.create(<PopupInfo title="test title" message="test message" onClose={handlePopupClosing} />);

  expect(tree.toJSON()).toMatchSnapshot();
});

it('should handle info popup closing', async () => {
  render(<PopupInfo title="test title" message="test message" onClose={handlePopupClosing} />);

  await userEvent.click(screen.getByText(Icon.MULTIPLICATION_X));

  expect(handlePopupClosing).toHaveBeenCalled();
});
