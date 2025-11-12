import { FilterType } from '../../../../enums';

export type FilterValue = string | string[];

export interface FilterDescriptor {
  key: string;
  type: FilterType;
  placeholder: string;
  options?: string[];
  multiple?: boolean;
  value?: FilterValue;
}
