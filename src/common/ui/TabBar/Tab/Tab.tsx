import React, { memo, MouseEventHandler, useMemo } from 'react';
import { EnumerableComponentProps } from 'common/interfaces';
import styles from './Tab.module.scss';

interface TabProps extends EnumerableComponentProps {
  label: string;
  isActive: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
}

function TabComponent({ label, isActive, onClick }: TabProps) {
  const activeTabClass = useMemo(() => {
    return isActive ? styles['Tab--active'] : '';
  }, [isActive]);

  return <div className={`${styles['Tab']} ${activeTabClass}`} onClick={onClick}>{label}</div>;
}

export const Tab = memo(TabComponent);
