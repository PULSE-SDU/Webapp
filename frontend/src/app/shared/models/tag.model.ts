import { BatteryStatus } from '../../enums';

export interface Tag {
  tagId: string;
  batteryLevel?: number;
  status: BatteryStatus;
  prediction?: string;
  voltage?: number;
}
