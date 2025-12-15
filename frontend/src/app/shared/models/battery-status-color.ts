import { BatteryStatus } from '../../enums';

export const StatusColor: Record<BatteryStatus, string> = {
  [BatteryStatus.FULL]: '#3dae43',
  [BatteryStatus.DEPLETING]: 'rgb(250,182,68)',
  [BatteryStatus.DEAD]: '#939393',
};
