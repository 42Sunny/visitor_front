import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

Sentry.init({
  dsn: 'https://4007cfd389bb455aa039960a9c0df423@o1068359.ingest.sentry.io/6062557',
  integrations: [new Integrations.BrowserTracing()],
  environment: 'local',

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.render(<App />, document.getElementById('root'));
