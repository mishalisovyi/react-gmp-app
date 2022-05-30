import React from 'react';
import { Divider, TabBar } from 'common/ui';
import styles from './MoviesFilterPanel.module.scss';

const tabsLabels = ['All', 'Documentary', 'Comedy', 'Horror', 'Crime'];

export function MoviesFilterPanel() {
  return (
    <>
      <div className={styles['MoviesFilterPanel']}>
        <TabBar tabsLabels={tabsLabels} />
      </div>
      <Divider />
    </>
  );
}
