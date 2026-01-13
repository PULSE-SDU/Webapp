import { BatteryStatus } from './battery-status.model';

export interface Tag {
  node_address: string;
  voltage: number;
  created_at?: string;
  updated_at?: string;
  battery_status?: BatteryStatus;
}
