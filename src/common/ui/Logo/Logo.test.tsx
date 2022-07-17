import React from 'react';
import renderer from 'react-test-renderer';

import { Logo } from './Logo';

it('should render logo', () => {
  const tree = renderer.create(<Logo />);

  expect(tree.toJSON()).toMatchSnapshot();
});
