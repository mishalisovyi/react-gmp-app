import React from 'react';
import styles from './Logo.module.scss';

export function Logo() {
  return (
    <div className={styles['Logo']}>
      <span className={styles['Logo__bold-part']}>netflix</span>
      <span className={styles['Logo__regular-part']}>roulette</span>
    </div>
  );
}
