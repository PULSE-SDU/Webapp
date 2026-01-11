import { BatteryStatusTitle } from '../../enums';

export interface BatteryStatus {
  title?: BatteryStatusTitle;
  percentage?: number;
  prediction_days?: number;
  prediction_hours?: number;
}
