import { BatteryStatus } from '../../enums';

export const StatusColor: Record<BatteryStatus, string> = {
  [BatteryStatus.NORMAL]: '#46a2ec',
  [BatteryStatus.CRITICAL]: '#ef4444',
  [BatteryStatus.WARNING]: '#f59e0b',
  [BatteryStatus.FULL]: '#4eaa52',
};
