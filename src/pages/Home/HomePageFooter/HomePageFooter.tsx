import React from 'react';
import { Logo } from 'common/ui';
import styles from './HomePageFooter.module.scss';

export function HomePageFooter() {
  return (
    <footer className={styles['HomePageFooter']}>
      <Logo />
    </footer>
  );
}
