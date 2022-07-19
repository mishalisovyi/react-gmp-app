import { formatMinutesTimeRange } from './util';

it('should format minutes time range', () => {
  expect(formatMinutesTimeRange(134)).toBe('2h 14min');
});
