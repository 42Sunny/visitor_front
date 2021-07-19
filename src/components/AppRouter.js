import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from 'routes/Index';
import Application from 'routes/Application';
import QR from 'components/QR';
import CheckReservation from 'routes/CheckReservation';

const AppRouter = () => <Router>
  <Switch>
    <Route path='/' exact component={Index} />
    <Route path='/reservation' exact component={Application} />
    <Route path='/check-reservation' exact component={CheckReservation} />
    <Route path='/qr/:code' exact component={QR} />
  </Switch>
</Router>

export default AppRouter;