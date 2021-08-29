import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import DashboardPage from 'admin/views/Dashboard/Dashboard.js';
import UserProfile from 'admin/views/UserProfile/UserProfile.js';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: '대시보드',
    icon: Dashboard,
    component: DashboardPage,
    layout: '/admin',
  },
  {
    path: '/user',
    name: '출입 관리',
    icon: Person,
    component: UserProfile,
    layout: '/admin',
  },
];

export default dashboardRoutes;
