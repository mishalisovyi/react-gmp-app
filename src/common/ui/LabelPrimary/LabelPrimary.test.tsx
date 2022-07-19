import React from 'react';
import renderer from 'react-test-renderer';

import { LabelPrimary } from './LabelPrimary';

it('should render primary label', () => {
  const tree = renderer.create(<LabelPrimary value="test" />);

  expect(tree.toJSON()).toMatchSnapshot();
});
