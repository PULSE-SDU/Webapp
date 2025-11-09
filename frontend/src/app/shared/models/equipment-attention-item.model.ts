export interface EquipmentAttentionItem {
  id: string;
  name: string;
  status: 'critical' | 'warning';
  location: string;
  batteryPercentage: number;
  daysLeft: number;
}
