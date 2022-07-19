import React from 'react';
import renderer from 'react-test-renderer';

import { LabelSecondary } from './LabelSecondary';

it('should render secondary label', () => {
  const tree = renderer.create(<LabelSecondary value="test" />);

  expect(tree.toJSON()).toMatchSnapshot();
});
