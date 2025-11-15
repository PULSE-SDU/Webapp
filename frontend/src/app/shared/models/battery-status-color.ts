import { BatteryStatus } from '../../enums';

export const BatteryStatusColor: Record<BatteryStatus, string> = {
  [BatteryStatus.CHARGING]: '#0D47A1',
  [BatteryStatus.CRITICAL]: '#B71C1C',
  [BatteryStatus.WARNING]: '#fd8e10',
  [BatteryStatus.FULL]: '#2E7D32',
};
