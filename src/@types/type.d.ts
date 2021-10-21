declare module 'loadsh';

interface visitor {
  name: string;
  organization: string;
  phone: string;
  key: string;
  isEditable: boolean;
  isChanged: boolean;
  autoSave: boolean;
  reserveId: number;
  id: string;
}
