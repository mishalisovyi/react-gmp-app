import React from 'react';
import renderer from 'react-test-renderer';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Tab } from './Tab';

const tabIndex = 3;
const tabValue = 'tab_value';
const tabLabel = 'Tab 4';

const tabClickedHandler = jest.fn();

it('should render tab', () => {
  const tree = renderer.create(<Tab label={tabLabel} value={tabValue} index={tabIndex} key={9784934} onClick={tabClickedHandler} isActive />);

  expect(tree.toJSON()).toMatchSnapshot();
});

it('should handle tab click', async () => {
  render(<Tab label={tabLabel} value={tabValue} index={tabIndex} key={9784934} onClick={tabClickedHandler} isActive />);

  await userEvent.click(screen.getByText(tabLabel));

  expect(tabClickedHandler).toHaveBeenCalledWith(tabIndex, tabValue);
});
