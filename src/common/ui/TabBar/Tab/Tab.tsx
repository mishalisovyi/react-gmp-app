import React, { memo, MouseEventHandler } from 'react';
import { EnumerableComponentProps } from 'common/interfaces';
import styles from './Tab.module.scss';

interface TabProps extends EnumerableComponentProps {
  label: string;
  isActive: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
}

function TabComponent({ label, isActive, onClick }: TabProps) {
  const activeTabClass = isActive ? styles['Tab--active'] : '';

  return <div className={`${styles['Tab']} ${activeTabClass}`} onClick={onClick}>{label}</div>;
}

export const Tab = memo(TabComponent);
