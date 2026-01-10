import { BatteryStatus } from './battery-status.model';

export interface Tag {
  node_address: string;
  voltage: number;
  batteryStatus?: BatteryStatus;
}
