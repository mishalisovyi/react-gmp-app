import React, { MouseEventHandler } from 'react';

interface ButtonPrimaryProps {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function ButtonPrimary({ text, onClick }: ButtonPrimaryProps) {
  return <button type="button" className="button button--primary" onClick={onClick}>{text}</button>;
}

ButtonPrimary.defaultProps = {
  onClick: () => { },
};
