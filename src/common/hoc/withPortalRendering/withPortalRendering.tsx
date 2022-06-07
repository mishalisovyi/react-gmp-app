import React from 'react';
import ReactDOM from 'react-dom';

export function withPortalRendering<Props>(Component: React.ComponentType<Props>) {
  return function renderPortal({ ...props }: Props) {
    const portalRootElement = document.getElementById('portal') as HTMLDivElement;

    return ReactDOM.createPortal(<Component {...props} />, portalRootElement);
  };
}
