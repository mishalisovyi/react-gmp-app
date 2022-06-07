import React, { MouseEventHandler } from 'react';

interface ButtonMenuProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function ButtonMenu({ onClick }: ButtonMenuProps) {
  return <button type="button" className="button button--menu" onClick={onClick}>&#8942;</button>;
}

ButtonMenu.defaultProps = {
  onClick: () => { },
};
