import React, { memo } from 'react';
import { MoviesContainer } from 'entities/movie/components';
import { HomePageFooter, HomePageHeader } from 'pages/Home';

import styles from './HomePage.module.scss';

function HomePageComponent() {
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

export const HomePage = memo(HomePageComponent);
