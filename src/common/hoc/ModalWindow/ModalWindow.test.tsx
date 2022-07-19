import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Icon } from 'common/constants';

import { ModalWindow } from './ModalWindow';

const modalWindowCloseHandler = jest.fn();
const primaryButtonClickHandler = jest.fn();
const secondaryButtonClickHandler = jest.fn();

const primaryButtonData = {
  show: true,
  text: 'Submit',
  onClick: primaryButtonClickHandler,
};

const secondaryButtonData = {
  show: true,
  text: 'Reset',
  onClick: secondaryButtonClickHandler,
};

beforeAll(() => {
  ReactDOM.createPortal = jest.fn((element) => {
    return element;
  }) as any;
});

afterAll(() => {
  (ReactDOM.createPortal as jest.Mock).mockClear();
});

it('should render modal window without buttons', () => {
  const tree = renderer.create(
    <ModalWindow title="test 1" onClose={modalWindowCloseHandler}>
      <p>test</p>
    </ModalWindow>,
  );

  expect(tree.toJSON()).toMatchSnapshot();
});

it('should render modal window with only primary button', () => {
  const tree = renderer.create(
    <ModalWindow title="test 2" primaryButton={primaryButtonData} onClose={modalWindowCloseHandler}>
      <p>test</p>
    </ModalWindow>,
  );

  expect(tree.toJSON()).toMatchSnapshot();
});

it('should render modal window with primary and secondary buttons', () => {
  const tree = renderer.create(
    <ModalWindow title="test 3" primaryButton={primaryButtonData} secondaryButton={secondaryButtonData} onClose={modalWindowCloseHandler}>
      <p>test</p>
    </ModalWindow>,
  );

  expect(tree.toJSON()).toMatchSnapshot();
});

it('should handle primary button click', async () => {
  render(
    <ModalWindow title="test 4" primaryButton={primaryButtonData} secondaryButton={secondaryButtonData} onClose={modalWindowCloseHandler}>
      <p>test</p>
    </ModalWindow>,
  );

  await userEvent.click(screen.getByText(primaryButtonData.text));

  expect(primaryButtonClickHandler).toHaveBeenCalled();
});

it('should handle secondary button click', async () => {
  render(
    <ModalWindow title="test 5" primaryButton={primaryButtonData} secondaryButton={secondaryButtonData} onClose={modalWindowCloseHandler}>
      <p>test</p>
    </ModalWindow>,
  );

  await userEvent.click(screen.getByText(secondaryButtonData.text));

  expect(secondaryButtonClickHandler).toHaveBeenCalled();
});

it('should handle modal window closing', async () => {
  render(
    <ModalWindow title="test 6" primaryButton={primaryButtonData} secondaryButton={secondaryButtonData} onClose={modalWindowCloseHandler}>
      <p>test</p>
    </ModalWindow>,
  );

  await userEvent.click(screen.getByText(Icon.MULTIPLICATION_X));

  expect(modalWindowCloseHandler).toHaveBeenCalled();
});
