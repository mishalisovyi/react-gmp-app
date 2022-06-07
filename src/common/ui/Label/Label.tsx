import React from 'react';
import styles from './Label.module.scss';

interface LabelProps {
  value: string | number;
}

export function Label({ value }: LabelProps) {
  return <span className={styles['Label']}>{value}</span>;
}
