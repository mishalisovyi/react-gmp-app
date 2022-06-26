export const sortingCompare = (itemA: any, itemB: any, sortField: string) => {
  if (typeof itemA[sortField] === 'number' && typeof itemB[sortField] === 'number') {
    return itemB[sortField] - itemA[sortField];
  }

  if (typeof itemA[sortField] === 'string' && typeof itemB[sortField] === 'string') {
    return itemA[sortField].localeCompare(itemB[sortField]);
  }

  return 0;
};

export const formatMinutesTimeRange = (minutes: number) => {
  const fullHours = Math.floor(minutes / 60);
  const minutesRemainder = minutes % 60;

  return `${fullHours}h ${minutesRemainder}min`;
};
