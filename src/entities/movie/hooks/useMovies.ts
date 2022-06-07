import { useState } from 'react';

import { sortingCompare } from 'common/util';
import { MOVIES_DATA, MOVIES_SORTING_SELECT_DATA } from 'entities/movie/constants';

/**
 * TODO: It needs to be deleted after implementation of data loading from server
 */
const timeout = (delay: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
};

export function useMovies() {
  const [loading, setLoading] = useState(false);

  const getList = async ({
    sortField = MOVIES_SORTING_SELECT_DATA.defaultValue,
  } = {}) => {
    setLoading(true);
    await timeout(1000);
    setLoading(false);

    return MOVIES_DATA.sort((itemA, itemB) => sortingCompare(itemA, itemB, sortField as string));
  };

  return { loading, getList };
}
