import React, { MouseEventHandler, useMemo } from 'react';

import { ButtonType } from 'common/enums';

interface ButtonProps {
  type: ButtonType;
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const getCssClassesByButtonType = (type: ButtonType): string => {
  return {
    [ButtonType.Primary]: 'button--primary',
    [ButtonType.Secondary]: 'button--secondary',
    [ButtonType.Tertiary]: 'button--small button--tertiary',
    [ButtonType.Menu]: 'button--menu',
    [ButtonType.Transparent]: 'button--transparent',
  }[type];
};

export function Button({ onClick, type, text }: ButtonProps) {
  const buttonClasses = useMemo(() => getCssClassesByButtonType(type), [type]);

  return <button type="button" className={`button ${buttonClasses}`} onClick={onClick}>{text}</button>;
}

Button.defaultProps = {
  onClick: () => { },
};
