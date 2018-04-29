
import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';

import { reactReduxFirebase } from 'react-redux-firebase';
import firebase from 'firebase';

import reducer from './state/reducers';

import { Header } from './header/Header';
import { Footer } from './footer/Footer';
import initialState from './state/initialstate';
// import AddDataTest from './components/AddDataTest';

import { Start, Login, CreateName, NameActions, NameSelection, Rate, Rating } from './pages';

import './sass/main.scss';

const firebaseConfig = {
  apiKey: 'AIzaSyCi41f1h5ZKKm0sVwbNOy0NhCB3JKoxPIU',
  authDomain: 'barnenavn-8d158.firebaseapp.com',
  databaseURL: 'https://barnenavn-8d158.firebaseio.com',
  projectId: 'barnenavn-8d158',
  storageBucket: '',
  messagingSenderId: '90189258818'
};

firebase.initializeApp(firebaseConfig);

const rrfConfig = {
  userProfile: 'users'
};

/* eslint-disable */
const enhancers = compose(
  reactReduxFirebase(firebase, rrfConfig),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
/* eslint-enable */

const store = createStore(reducer, initialState, enhancers);

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="wrapper">
        <Header />
        <Route exact path="/" component={Start} />
        <Route path="/login" component={Login} />
        <Route path="/nameselection" component={NameSelection} />
        <Route path="/createname" component={CreateName} />
        <Route path="/:nameid/actions" component={NameActions} />
        <Route path="/:nameid/rate" component={Rate} />
        <Route path="/:nameid/rating" component={Rating} />
        <Footer />
      </div>
    </Router>
  </Provider>
);

export default App;
