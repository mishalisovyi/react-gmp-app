import React, { memo, useMemo } from 'react';
import { EnumerableComponentProps } from 'common/interfaces';
import styles from './Tab.module.scss';

interface TabProps extends EnumerableComponentProps {
  label: string;
  isActive: boolean;
  index: number;
  onClick: (tabIndex: number, tabLabel: string) => void;
}

function TabComponent({
  index,
  label,
  isActive,
  onClick,
}: TabProps) {
  const activeTabClass = useMemo(() => {
    return isActive ? styles['Tab--active'] : '';
  }, [isActive]);

  const handleTabClick = () => {
    onClick(index, label);
  };

  return <div className={`${styles['Tab']} ${activeTabClass}`} onClick={handleTabClick}>{label}</div>;
}

export const Tab = memo(TabComponent);
