import AdminPage from 'admin';
import { ReserveProvider } from 'contexts/ReserveContext';
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import ErrorPage from 'routes/ErrorPage';
import IndexPage from 'routes/IndexPage';
import LookupPage from 'routes/LookupPage';
import QRPage from 'routes/QRPage';
import ReserveInfoPage from 'routes/ReserveInfoPage';
import ReservePage from 'routes/ReservePage';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <IndexPage />
        </Route>
        <Route path="/reserve" exact>
          <ReserveProvider>
            <ReservePage />
          </ReserveProvider>
        </Route>
        <Route path="/lookup" exact>
          <LookupPage />
        </Route>
        <Route path="/reserve-info/:id" exact>
          <ReserveInfoPage />
        </Route>
        <Route path="/qr/:code" exact>
          <QRPage />
        </Route>
        <Route path="/admin" exact>
          <AdminPage />
        </Route>
        <Route path="/error" exact>
          <ErrorPage />
        </Route>
        <Redirect from="*" to="/error" />
      </Switch>
    </Router>
  );
};

export default AppRouter;
