import React, { MouseEventHandler } from 'react';

interface ButtonTransparentProps {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function ButtonTransparent({ text, onClick }: ButtonTransparentProps) {
  return <button type="button" className="button button--transparent" onClick={onClick}>{text}</button>;
}

ButtonTransparent.defaultProps = {
  onClick: () => { },
};
