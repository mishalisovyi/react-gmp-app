import React, { useCallback, useState } from 'react';
import memoize from 'fast-memoize';

import { ButtonTransparent } from 'common/ui';
import styles from './DropdownMenu.module.scss';

interface DropdownMenuProps {
  children: React.ReactNode,
  items: string[],
  onOptionClicked: (option: string) => void;
}

export function DropdownMenu({ children, items, onOptionClicked }: DropdownMenuProps) {
  const [isOpened, setIsOpened] = useState(false);

  const handleMenuTargetClick = () => {
    setIsOpened(true);
  };

  const handleMenuOptionClick = useCallback(memoize((option: string) => {
    return () => {
      setIsOpened(false);
      onOptionClicked(option);
    };
  }), []);

  const handleCloseButtonClick = () => {
    setIsOpened(false);
  };

  return (
    <>
      {!isOpened && (
        <div onClick={handleMenuTargetClick}>{children}</div>
      )}

      {isOpened && (
        <div className={styles['DropdownMenu']}>
          <div className={styles['DropdownMenu__close-button']}>
            <ButtonTransparent text="&#10005;" onClick={handleCloseButtonClick} />
          </div>
          {items.map((item) => <div className={styles['DropdownMenu__item']} onClick={handleMenuOptionClick(item)} key={item}>{item}</div>)}
        </div>
      )}
    </>
  );
}
