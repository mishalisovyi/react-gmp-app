import React, { useState } from 'react';
import { Tab } from 'common/ui';
import styles from './TabBar.module.scss';

interface TabBarProps {
  tabsLabels: string[]
}

export function TabBar({ tabsLabels }: TabBarProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleTabClick = (tabIndex: number) => {
    setActiveTabIndex(tabIndex);
  };

  return (
    <div className={styles['TabBar']}>
      {tabsLabels.map((label, index) => {
        return (
          <Tab
            label={label}
            key={`${label}_${index}`}
            isActive={index === activeTabIndex}
            onClick={() => handleTabClick(index)}
          />
        );
      })}
    </div>
  );
}
