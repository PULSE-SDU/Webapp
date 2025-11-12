import { TagStatus } from '../../enums';

export interface Tag {
  tagId: string;
  equipmentName?: string;
  type?: string;
  location?: string;
  batteryLevel?: number;
  status?: TagStatus;
  prediction?: string;
  voltage?: number;
}
