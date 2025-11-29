import { BatteryStatus } from '../../enums';

export const StatusColor: Record<string | BatteryStatus, string> = {
  [BatteryStatus.NORMAL]: '#46a2ec',
  [BatteryStatus.CRITICAL]: '#ef4444',
  [BatteryStatus.WARNING]: '#f59e0b',
  [BatteryStatus.FULL]: '#4eaa52',

  green: '#4eaa52',
  yellow: '#f59e0b',
  red: '#ef4444',
  blue: '#46a2ec',
};


