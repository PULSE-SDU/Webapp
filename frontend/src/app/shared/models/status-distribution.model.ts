import { EquipmentStatus } from '../../enums';

export interface StatusDistribution {
  status: EquipmentStatus;
  count: number;
}

export interface StatusDistributionResponse {
  data: StatusDistribution[];
}

