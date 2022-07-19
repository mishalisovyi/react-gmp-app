import React from 'react';
import renderer from 'react-test-renderer';

import { Divider } from './Divider';

it('should render divider', () => {
  const tree = renderer.create(<Divider />);

  expect(tree.toJSON()).toMatchSnapshot();
});
