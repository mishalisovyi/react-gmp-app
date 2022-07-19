import React from 'react';
import renderer from 'react-test-renderer';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ButtonType } from 'common/enums';
import { Button } from './Button';

it('should render primary button', () => {
  const tree = renderer.create(<Button type={ButtonType.Primary} text="primary button" onClick={() => { }} />);

  expect(tree.toJSON()).toMatchSnapshot();
});

it('should render secondary button', () => {
  const tree = renderer.create(<Button type={ButtonType.Secondary} text="secondary button" onClick={() => { }} />);

  expect(tree.toJSON()).toMatchSnapshot();
});

it('should render tertiary button', () => {
  const tree = renderer.create(<Button type={ButtonType.Tertiary} text="tertiary button" onClick={() => { }} />);

  expect(tree.toJSON()).toMatchSnapshot();
});

it('should render menu button', () => {
  const tree = renderer.create(<Button type={ButtonType.Menu} text="menu button" onClick={() => { }} />);

  expect(tree.toJSON()).toMatchSnapshot();
});

it('should render transparent button', () => {
  const tree = renderer.create(<Button type={ButtonType.Transparent} text="transparent button" onClick={() => { }} />);

  expect(tree.toJSON()).toMatchSnapshot();
});

it('should render search button', () => {
  const tree = renderer.create(<Button type={ButtonType.Search} text="search button" onClick={() => { }} />);

  expect(tree.toJSON()).toMatchSnapshot();
});

it('should handle click', async () => {
  const clickHandler = jest.fn();
  const buttonText = 'search button';

  render(<Button type={ButtonType.Search} text={buttonText} onClick={clickHandler} />);

  await userEvent.click(screen.getByText(buttonText));

  expect(clickHandler).toHaveBeenCalled();
});
