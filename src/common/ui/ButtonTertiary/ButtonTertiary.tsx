import React from 'react';

interface ButtonTertiaryProps {
  text: string;
}

export function ButtonTertiary({ text }: ButtonTertiaryProps) {
  return <button type="button" className="button button--small button--tertiary">{text}</button>;
}
