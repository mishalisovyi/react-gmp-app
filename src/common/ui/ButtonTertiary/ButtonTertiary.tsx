import React, { memo, MouseEventHandler } from 'react';

interface ButtonTertiaryProps {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function ButtonTertiaryComponent({ text, onClick }: ButtonTertiaryProps) {
  return <button type="button" className="button button--small button--tertiary" onClick={onClick}>{text}</button>;
}

ButtonTertiaryComponent.defaultProps = {
  onClick: () => { },
};

export const ButtonTertiary = memo(ButtonTertiaryComponent);
