import React from 'react';

import styles from './NotFoundPage.module.scss';

export function NotFoundPage() {
  return (
    <div className={styles['NotFoundPage']}>
      <h1 className="typography-heading">Page not found</h1>
    </div>
  );
}
