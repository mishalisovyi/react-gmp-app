import React, { memo, useCallback, useState } from 'react';
import memoize from 'fast-memoize';

import { Tab } from 'common/ui';
import styles from './TabBar.module.scss';

interface TabBarProps {
  tabs: string[];
  defaultActiveTab: string;
  onActiveTabChanged: (tabLabel: string) => void;
}

const getDefaultActiveTabIndex = (tabs: string[], defaultActiveTabLabel: string) => {
  return tabs.findIndex((item) => item === defaultActiveTabLabel);
};

function TabBarComponent({ tabs, defaultActiveTab, onActiveTabChanged }: TabBarProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(
    getDefaultActiveTabIndex(tabs, defaultActiveTab),
  );

  const handleTabClick = useCallback(memoize((tabIndex: number, tabLabel: string) => {
    return () => {
      setActiveTabIndex(tabIndex);
      onActiveTabChanged(tabLabel);
    };
  }), []);

  return (
    <div className={styles['TabBar']}>
      {tabs.map((label, index) => {
        return (
          <Tab
            label={label}
            key={label}
            isActive={index === activeTabIndex}
            onClick={handleTabClick(index, label)}
          />
        );
      })}
    </div>
  );
}

export const TabBar = memo(TabBarComponent);
