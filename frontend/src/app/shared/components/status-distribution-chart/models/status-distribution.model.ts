export interface StatusDistribution {
  status: EquipmentStatus;
  count: number;
}

export enum EquipmentStatus {
  Normal = 'Normal',
  Warning = 'Warning',
  Critical = 'Critical',
  Charging = 'Charging',
}

export interface StatusDistributionResponse {
  data: StatusDistribution[];
}
