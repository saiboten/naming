/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './sass/main.scss';

/* eslint-disable */
ReactDOM.render(<App />, document.getElementById('root'));
/* eslint-enable */

registerServiceWorker();
