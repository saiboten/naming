import React from 'react';
import { any } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

const guttenavn = ['Aiden',
  'Jackson',
  'Ethan',
  'Liam',
  'Mason',
  'Noah',
  'Lucas',
  'Jacob',
  'Jayden',
  'Jack',
  'Logan',
  'Ryan',
  'Caleb',
  'Benjamin',
  'William',
  'Michael',
  'Alexander',
  'Elijah',
  'Matthew',
  'Dylan',
  'James',
  'Owen',
  'Connor',
  'Brayden',
  'Carter',
  'Landon',
  'Joshua',
  'Luke',
  'Daniel',
  'Gabriel',
  'Nicholas',
  'Nathan',
  'Oliver',
  'Henry',
  'Andrew',
  'Gavin',
  'Cameron',
  'Eli',
  'Max',
  'Isaac',
  'Evan',
  'Samuel',
  'Grayson',
  'Tyler',
  'Zachary',
  'Wyatt',
  'Joseph',
  'Charlie',
  'Hunter',
  'Anthony',
  'Christian',
  'Colton',
  'Thomas',
  'Dominic',
  'Austin',
  'John',
  'Sebastian',
  'Cooper',
  'Levi',
  'Parker',
  'Isaiah',
  'Chase',
  'Blake',
  'Aaron',
  'Alex',
  'Adam',
  'Tristan',
  'Julian',
  'Jonathan',
  'Christopher',
  'Jace',
  'Nolan',
  'Miles',
  'Jordan',
  'Carson',
  'Colin',
  'Ian',
  'Riley',
  'Xavier',
  'Hudson',
  'Adrian',
  'Cole',
  'Brody',
  'Leo',
  'Jake',
  'Bentley',
  'Sean',
  'Jeremiah',
  'Asher',
  'Nathaniel',
  'Micah',
  'Jason',
  'Ryder',
  'Declan',
  'Hayden',
  'Brandon',
  'Easton',
  'Lincoln',
  'Harrison'];

const Todos = ({ names, firebase }) => {
  const handleAdd = () => guttenavn.forEach((name) => {
    firebase.push('names', { name, boy: true });
  });

  const renderLoadingDone = () => (isEmpty(names)
    ? 'Todo list is empty'
    : Object.keys(names).map(key => (
      <li key={key}>{names[key].name}</li>
    )));

  const todosList = !isLoaded(names)
    ? 'Loading'
    : renderLoadingDone();
  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todosList}
      </ul>
      <button onClick={handleAdd}>
        Add
      </button>
    </div>
  );
};

Todos.propTypes = {
  firebase: any.isRequired,
  names: any
};

Todos.defaultProps = {
  names: {}
};

export default compose(
  firebaseConnect([
    { path: '/names' } // { path: '/names' } // object notation
  ]),
  connect(state => ({
    names: state.firebase.data.names,
    // profile: state.firebase.profile // load profile
  }))
)(Todos);
