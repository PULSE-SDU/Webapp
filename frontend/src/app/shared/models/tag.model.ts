import { BatteryStatus } from '../../enums';

export interface Tag {
  nodeAddress: string;
  batteryLevel?: number;
  status: BatteryStatus;
  prediction?: string;
  voltage?: number;
}
