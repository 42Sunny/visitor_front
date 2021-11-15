import React from 'react';
import ReactDOM from 'react-dom';
import initSentry from 'tools/initSentry';
import App from './components/App';

initSentry();

ReactDOM.render(<App />, document.getElementById('root'));
