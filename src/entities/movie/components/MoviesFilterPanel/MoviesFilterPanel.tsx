import React, { memo } from 'react';

import { Divider, FilterSelectList, TabBar } from 'common/ui';
import { MOVIES_SORTING_SELECT_DATA, MOVIES_TABS_LABELS } from 'entities/movie/constants';

import styles from './MoviesFilterPanel.module.scss';

interface MoviesFilterPanelProps {
  defaultSortField: string;
  onSort: (selectedValue: string) => void
}

function MoviesFilterPanelComponent({ defaultSortField, onSort }: MoviesFilterPanelProps) {
  const handleSelectionChanged = (selectedValue: string) => {
    onSort(selectedValue);
  };

  return (
    <>
      <div className={styles['MoviesFilterPanel']}>
        <TabBar tabsLabels={MOVIES_TABS_LABELS} />
        <FilterSelectList label="Sort by" data={MOVIES_SORTING_SELECT_DATA} defaultValue={defaultSortField} onSelectionChanged={handleSelectionChanged} />
      </div>
      <Divider />
    </>
  );
}

export const MoviesFilterPanel = memo(MoviesFilterPanelComponent);
