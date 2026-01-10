import { BatteryStatusTitle } from '../../enums';

export interface BatteryStatus {
  status_title?: BatteryStatusTitle;
  battery_percentage?: number;
  prediction_days?: number;
  prediction_hours?: number;
}
