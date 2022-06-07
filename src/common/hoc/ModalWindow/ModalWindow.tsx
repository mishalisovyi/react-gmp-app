import React from 'react';

import { ModalWindowProps } from 'common/interfaces';
import { withPortalRendering } from 'common/hoc';
import { ButtonPrimary, ButtonSecondary, ButtonTransparent } from 'common/ui';

import styles from './ModalWindow.module.scss';

const defaultActionButtonAttributes = {
  show: false,
  text: '',
  onClick: () => { },
};

function ModalWindowComponent({
  title = '',
  primaryButton = defaultActionButtonAttributes,
  secondaryButton = defaultActionButtonAttributes,
  onClose,
  children,
}: ModalWindowProps) {
  const primaryButtonElement = primaryButton.show
    ? <ButtonPrimary text={primaryButton.text} onClick={primaryButton.onClick} />
    : null;
  const secondaryButtonElement = secondaryButton.show
    ? <ButtonSecondary text={secondaryButton.text} onClick={secondaryButton.onClick} />
    : null;

  return (
    <div className={styles['ModalWindow__container']}>
      <div className={styles['ModalWindow__backdrop']} />
      <div className={styles['ModalWindow__window']}>
        <div className={styles['window__close-button-wrapper']}>
          <ButtonTransparent text="&#10005;" onClick={onClose} />
        </div>
        <header className={styles['window__title']}>{title}</header>
        <div className={styles['window__body']}>{children}</div>
        <div className={styles['window__action-buttons']}>
          {secondaryButtonElement}
          {primaryButtonElement}
        </div>
      </div>
    </div>
  );
}

export const ModalWindow = withPortalRendering(ModalWindowComponent);
