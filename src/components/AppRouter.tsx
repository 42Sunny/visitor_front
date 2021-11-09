import { ReserveProvider } from 'contexts/ReserveContext';
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import ErrorPage from 'pages/ErrorPage';
import IndexPage from 'pages/IndexPage';
import LookupPage from 'pages/LookupPage';
import QRPage from 'pages/QRPage';
import ReserveInfoPage from 'pages/ReserveInfoPage';
import ReservePage from 'pages/ReservePage';
import { Header } from './Header/Header';
import Page from 'components/Common/Page';
import Footer from './Footer/Footer';

const AppRouter = () => {
  return (
    <Router>
      <Header />
      <Page>
        <Switch>
          <Route path="/reserve" exact>
            <ReserveProvider>
              <ReservePage />
            </ReserveProvider>
          </Route>
          <Route path="/lookup" exact>
            <LookupPage />
          </Route>
          <Route path="/reserve-info/:reserveId" exact>
            <ReserveInfoPage />
          </Route>
          <Route path="/qr/:code" exact>
            <QRPage />
          </Route>
          <Route path="/error" exact>
            <ErrorPage />
          </Route>
          <Redirect from="/" to="/reserve" />
          <Redirect from="*" to="/error" />
          <Route path="/" exact>
            <IndexPage />
          </Route>
        </Switch>
      </Page>
      <Footer />
    </Router>
  );
};

export default AppRouter;
