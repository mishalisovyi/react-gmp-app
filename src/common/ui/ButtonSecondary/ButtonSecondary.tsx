import React, { MouseEventHandler } from 'react';

interface ButtonSecondaryProps {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function ButtonSecondary({ text, onClick }: ButtonSecondaryProps) {
  return <button type="button" className="button button--secondary" onClick={onClick}>{text}</button>;
}

ButtonSecondary.defaultProps = {
  onClick: () => { },
};
