import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

const initSentry = () => {
  if (process.env.REACT_APP_ENVIRONMENT !== 'local') {
    Sentry.init({
      dsn: process.env.REACT_APP_SENTRY_DSN,
      integrations: [new Integrations.BrowserTracing()],
      environment: process.env.REACT_APP_ENVIRONMENT,

      tracesSampleRate: 0.2,
    });
  }
};

export default initSentry;
