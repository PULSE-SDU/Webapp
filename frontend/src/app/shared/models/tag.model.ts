export type TagStatus = 'charging' | 'critical' | 'warning' | 'ok';

export interface Tag {
  tagId: string;
  equipmentName: string;
  type?: string;
  location?: string;
  batteryLevel?: number; // 0-100 percentage
  status?: TagStatus;
  prediction?: string;
  voltage?: string;
  daysLeft?: number;
  // whatever else we need
}
