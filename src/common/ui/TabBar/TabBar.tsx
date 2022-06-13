import React, { memo, useCallback, useState } from 'react';
import memoize from 'fast-memoize';

import { Tab } from 'common/ui';
import styles from './TabBar.module.scss';

interface TabBarProps {
  tabsLabels: string[]
}

function TabBarComponent({ tabsLabels }: TabBarProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleTabClick = useCallback(memoize((tabIndex: number) => {
    return () => {
      setActiveTabIndex(tabIndex);
    };
  }), []);

  return (
    <div className={styles['TabBar']}>
      {tabsLabels.map((label, index) => {
        return (
          <Tab
            label={label}
            key={label}
            isActive={index === activeTabIndex}
            onClick={handleTabClick(index)}
          />
        );
      })}
    </div>
  );
}

export const TabBar = memo(TabBarComponent);
