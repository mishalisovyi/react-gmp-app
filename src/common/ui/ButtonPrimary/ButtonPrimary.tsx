import React from 'react';

interface ButtonPrimaryProps {
  text: string;
}

export function ButtonPrimary({ text }: ButtonPrimaryProps) {
  return <button type="button" className="button button--primary">{text}</button>;
}
