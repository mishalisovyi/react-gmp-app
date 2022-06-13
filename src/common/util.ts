export const sortingCompare = (itemA: any, itemB: any, sortField: string) => {
  if (typeof itemA[sortField] === 'number' && typeof itemB[sortField] === 'number') {
    return itemB[sortField] - itemA[sortField];
  }

  if (typeof itemA[sortField] === 'string' && typeof itemB[sortField] === 'string') {
    return itemA[sortField].localeCompare(itemB[sortField]);
  }

  return 0;
};
