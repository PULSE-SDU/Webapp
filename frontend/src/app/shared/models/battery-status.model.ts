import { BatteryStatusTitle } from '../../enums';

export interface BatteryStatus {
  id: number;
  node_address: string;
  title?: BatteryStatusTitle;
  percentage?: number;
  prediction_days?: number;
  prediction_hours?: number;
}
