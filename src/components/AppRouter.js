import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from 'routes/Index';
import Admin from 'routes/Admin';
import Staff from 'routes/Staff';
import Application from 'routes/Application';
import Reservation from 'routes/Reservation';
import QR from 'components/QR';
import Login from 'routes/Login';
import CheckReservation from 'routes/CheckReservation';

const AppRouter = () => <Router>
  <Switch>
    <Route path='/' exact component={Index} />
    <Route path='/admin' exact component={Admin} />
    <Route path='/staff' exact component={Staff} />
    <Route path='/application' exact component={Application} />
    <Route path='/check-reservation' exact component={CheckReservation} />
    <Route path='/reservation' exact component={Reservation} />
    <Route path='/login' exact component={Login} />
    <Route path='/qr' exact component={QR} />
  </Switch>
</Router>

export default AppRouter;