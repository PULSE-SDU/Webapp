export enum TimeRangeFilterOption {
  Last30Days = 'Last  30 Days',
  Last14Days = 'Last 14 Days',
  Last7Days = 'Last 7 days',
}

export const TimeRangeFilterMap: Record<TimeRangeFilterOption, number> = {
  [TimeRangeFilterOption.Last30Days]: 30,
  [TimeRangeFilterOption.Last14Days]: 14,
  [TimeRangeFilterOption.Last7Days]: 7,
};
