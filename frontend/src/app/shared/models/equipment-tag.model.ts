export interface EquipmentTag {
  tagId: string;
  equipmentName: string;
  type: string;
  location: string;
  batteryLevel: number;
  status: 'critical' | 'warning' | 'normal' | 'charging';
  prediction: string;
  voltage?: string;
}
