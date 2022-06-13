import React, { memo } from 'react';

import { Divider, FilterSelectList, TabBar } from 'common/ui';
import { MOVIES_SORTING_SELECT_DATA, MOVIES_TABS_DATA } from 'entities/movie/constants';

import styles from './MoviesFilterPanel.module.scss';

interface MoviesFilterPanelProps {
  onSortingPerformed: (selectedValue: string) => void;
  onGenreFilterApplied: (tabLabel: string) => void;
}

function MoviesFilterPanelComponent({
  onGenreFilterApplied,
  onSortingPerformed,
}: MoviesFilterPanelProps) {
  const handleActiveTabChange = (tabLabel: string) => {
    onGenreFilterApplied(tabLabel);
  };

  const handleFilterSelectionChange = (selectedValue: string) => {
    onSortingPerformed(selectedValue);
  };

  return (
    <>
      <div className={styles['MoviesFilterPanel']}>
        <TabBar
          tabs={MOVIES_TABS_DATA.items}
          defaultActiveTab={MOVIES_TABS_DATA.defaultValue}
          onActiveTabChanged={handleActiveTabChange}
        />
        <FilterSelectList label="Sort by" options={MOVIES_SORTING_SELECT_DATA.items} defaultValue={MOVIES_SORTING_SELECT_DATA.defaultValue} onSelectionChanged={handleFilterSelectionChange} />
      </div>
      <Divider />
    </>
  );
}

export const MoviesFilterPanel = memo(MoviesFilterPanelComponent);
