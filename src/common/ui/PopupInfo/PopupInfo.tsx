import React from 'react';

import { ModalWindow } from 'common/hoc';
import { ModalWindowProps } from 'common/interfaces';

type PopupInfoProps = Omit<ModalWindowProps, 'primaryButton' | 'secondaryButton'>;

export function PopupInfo({ children, onClose }: PopupInfoProps) {
  return (
    <ModalWindow onClose={onClose}>
      {children}
    </ModalWindow>
  );
}
