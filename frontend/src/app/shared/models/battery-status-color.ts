import { BatteryStatus } from '../../enums';

export const BatteryStatusColor: Record<BatteryStatus, string> = {
  [BatteryStatus.CHARGING]: '#46a2ec',
  [BatteryStatus.CRITICAL]: '#ef4444',
  [BatteryStatus.WARNING]: '#f59e0b',
  [BatteryStatus.FULL]: '#4eaa52',
};
