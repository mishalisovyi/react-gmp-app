import React from 'react';
import ReactDOM from 'react-dom';

import { render } from '@testing-library/react';

import { withPortalRendering } from './withPortalRendering';

const divElement = document.createElement('div');

const testProps = {
  aaa: 'aaa',
  bbb: 'bbb',
};

function TestComponent(props: any) {
  return <div {...props}>test</div>;
}

beforeAll(() => {
  document.getElementById = jest.fn(() => divElement) as any;
});

afterAll(() => {
  (document.getElementById as jest.Mock).mockClear();
});

it('should render component in portal', () => {
  const createPortalSpy = jest.spyOn(ReactDOM, 'createPortal');

  const WrappedTestComponent = withPortalRendering(TestComponent);

  render(<WrappedTestComponent {...testProps} />);

  const params = createPortalSpy.mock.calls[0];

  const parameterFragment = render(params[0] as any).asFragment();
  const renderedComponentFragment = render(<TestComponent {...testProps} /> as any).asFragment();

  expect(createPortalSpy).toHaveBeenCalledTimes(1);

  expect(parameterFragment).toEqual(renderedComponentFragment);
  expect(params[1]).toBe(divElement);
});
