import React from 'react';
import renderer from 'react-test-renderer';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TabBar } from './TabBar';

const tabsData = [{
  title: 'Tab 1',
  value: 'tab_1',
}, {
  title: 'Tab 2',
  value: 'tab_2',
}];

const activeTabChangedHandler = jest.fn();

it('should render tab bar', () => {
  const tree = renderer.create(<TabBar tabs={tabsData} defaultActiveTab={tabsData[0].value} onActiveTabChanged={activeTabChangedHandler} />);

  expect(tree.toJSON()).toMatchSnapshot();
});

it('should change active tab', async () => {
  render(<TabBar tabs={tabsData} defaultActiveTab={tabsData[0].value} onActiveTabChanged={activeTabChangedHandler} />);

  await userEvent.click(screen.getByText(tabsData[1].title));

  expect(activeTabChangedHandler).toHaveBeenCalledWith(tabsData[1].value);
});
