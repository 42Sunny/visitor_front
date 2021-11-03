module 'loadsh';
module 'package.json';
module 'react-modal';

type visitor = {
  name: string;
  organization: string;
  phone: string;
  key: string;
  isEditable: boolean;
  isChanged: boolean;
  autoSave: boolean;
  reserveId: number;
  id: string;
};

type staff = {
  name: string;
  phone: string;
};

type reserve = {
  date: string;
  place: string;
  targetStaffName: string;
  purpose: string;
  visitors: visitor[];
  staff: staff;
};
