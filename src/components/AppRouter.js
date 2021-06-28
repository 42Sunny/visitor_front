import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Index from '../routes/Index';
import Admin from '../routes/Admin';
import Confirmation from '../routes/Confirmation';
import Application from '../routes/Application';
import Reservation from '../routes/Reservation';
import Result from '../routes/Result';
import QR from '../routes/QR';
import Login from '../routes/Login';

const AppRouter = () => <Router>
	<Switch>
		<Route path='/' exact component={Index} />
		<Route path='/admin' exact component={Admin} />
		<Route path='/application' exact component={Application} />
		<Route path='/application-result/:number' exact component={Result} />
		<Route path='/confirmation' exact component={Confirmation} />
		<Route path='/reservation' exact component={Reservation} />
		<Route path='/login' exact component={Login} />
		<Route path='/qr' exact component={QR} />
	</Switch>
</Router>

export default AppRouter;