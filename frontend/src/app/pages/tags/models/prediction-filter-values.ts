export enum PredictionFilterOption {
  LessThan24Hours = 'Less than 24 hours',
  OneToThreeDays = '1-3 days',
  MoreThanThreeDays = 'More than 3 days',
}

export const PredictionFilterMap: Record<PredictionFilterOption, string[] | string> = {
  [PredictionFilterOption.LessThan24Hours]: ['0'],
  [PredictionFilterOption.OneToThreeDays]: ['1', '2', '3'],
  [PredictionFilterOption.MoreThanThreeDays]: '3',
};
