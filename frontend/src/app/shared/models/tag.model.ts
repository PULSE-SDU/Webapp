import { BatteryStatus } from '../../enums';

export interface Tag {
  id?: number;
  tagId: string;
  batteryLevel?: number;
  status: BatteryStatus;
  prediction?: string;
  voltage?: number;
}
