import { BatteryStatusTitle } from '../../enums';

export const StatusColor: Record<BatteryStatusTitle, string> = {
  [BatteryStatusTitle.GOOD]: '#3dae43',
  [BatteryStatusTitle.LOW]: 'rgb(250,182,68)',
  [BatteryStatusTitle.OFFLINE]: '#939393',
};
