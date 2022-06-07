import React from 'react';
import { ButtonTertiary, Logo, SearchPanel } from 'common/ui';
import styles from './HomePageHeader.module.scss';

export function HomePageHeader() {
  return (
    <header>
      <div className={styles['HomePageHeader']}>
        <div className={styles['HomePageHeader__head']}>
          <Logo />
          <ButtonTertiary text="+ ADD MOVIE" />
        </div>

        <div className={styles['HomePageHeader__body']}>
          <SearchPanel labelText="Find your movie" />
        </div>
      </div>
    </header>
  );
}
