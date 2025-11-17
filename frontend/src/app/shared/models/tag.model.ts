import { BatteryStatus } from '../../enums';

export interface Tag {
  tagId: string;
  equipmentName?: string;
  type?: string;
  location?: string;
  batteryLevel?: number;
  status: BatteryStatus;
  prediction?: string;
  voltage?: number;
  daysLeft?: number;
}
