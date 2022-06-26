import React, { memo, useCallback, useState } from 'react';

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

  const handleTabClick = useCallback((tabIndex: number, tabLabel: string) => {
    setActiveTabIndex(tabIndex);
    onActiveTabChanged(tabLabel);
  }, []);

  return (
    <div className={styles['TabBar']}>
      {tabs.map((label, index) => {
        return (
          <Tab
            label={label}
            key={label}
            index={index}
            isActive={index === activeTabIndex}
            onClick={handleTabClick}
          />
        );
      })}
    </div>
  );
}

export const TabBar = memo(TabBarComponent);
