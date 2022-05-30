import React from 'react';

import { MoviesContainer } from 'entities/movie/components';
import { HomePageFooter, HomePageHeader } from 'pages/Home';

import styles from './HomePage.module.scss';

export function HomePage() {
  return (
    <>
      <HomePageHeader />
      <main className={styles['MoviesContainer']}>
        <MoviesContainer />
      </main>
      <HomePageFooter />
    </>
  );
}
