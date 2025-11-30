import { BatteryStatus } from '../../../../enums';

export interface BatteryBarData {
  status: BatteryStatus;
  batteryLevel: number;
}
