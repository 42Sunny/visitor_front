module 'loadsh';
module 'package.json';
module 'react-modal';

type Visitor = {
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

type CompactVisitor = {
  name: string;
  phone: string;
  organization: string;
  isChanged?: boolean;
};

type Staff = {
  name: string;
  phone: string;
};

type reserve = {
  date: string;
  place: string;
  targetStaffName: string;
  purpose: string;
  visitors: Visitor[];
  staff: Staff;
};
