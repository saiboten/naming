
import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { createStore, compose, applyMiddleware } from 'redux';

import { Provider } from 'react-redux';

import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import firebase from 'firebase';
import thunk from 'redux-thunk';
import reducer from './state/reducers';

import { Header } from './header/Header';
import { Footer } from './footer/Footer';
import initialState from './state/initialstate';
// import AddDataTest from './components/AddDataTest';

import { Login, CreateName, Start, NameActions, Rate, Rating, Administer, Join } from './pages';

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
  applyMiddleware(
    thunk.withExtraArgument(getFirebase) // Pass getFirebase function as extra argument
  ),
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
        <Route path="/createname" component={CreateName} />
        <Route path="/nick/actions/:nick" component={NameActions} />
        <Route path="/nick/rate/:nick" component={Rate} />
        <Route path="/nick/rating/:nick" component={Rating} />
        <Route path="/nick/administer/:nick" component={Administer} />
        <Route path="/join" component={Join} />

        <Footer />
      </div>
    </Router>
  </Provider>
);

export default App;
