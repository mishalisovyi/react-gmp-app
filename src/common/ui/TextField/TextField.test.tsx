import React from 'react';
import renderer from 'react-test-renderer';

import { TextField } from './TextField';

it('should render text field', () => {
  const tree = renderer.create(<TextField value="test value" placeholder="test placeholder" />);

  expect(tree.toJSON()).toMatchSnapshot();
});
