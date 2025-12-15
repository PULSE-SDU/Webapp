import { BatteryStatus } from '../../enums';

export const StatusColor: Record<BatteryStatus, string> = {
  [BatteryStatus.GOOD]: '#3dae43',
  [BatteryStatus.LOW]: 'rgb(250,182,68)',
  [BatteryStatus.OFFLINE]: '#939393',
};
