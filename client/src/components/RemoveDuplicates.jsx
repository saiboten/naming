import React from 'react';
import { any } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

const RemoveDuplicatesComponent = ({ names, firebase }) => {
  console.log(firebase);
  const doStuff = () => {
    const mapOfNames = {};

    console.log(Object.keys(names).length);

    // Object.keys(names).sort((key1, key2) => names[key1].name.localeCompare(names[key2].name)).forEach((key) => {
    //   if (mapOfNames[names[key].name]) {
    //     console.log(`Delete key ${key} - ${names[key].name}`);
    //     firebase.database().ref(`names/${key}`).remove();
    //   } else {
    //     mapOfNames[names[key].name] = true;
    //   }
    // });
    console.log('Res: ', mapOfNames);
  };

  const deleteName = (key) => {
    firebase.database().ref(`names/${key}`).remove();
  };


  const renderLoadingDone = () => (isEmpty(names)
    ? 'Todo list is empty'
    : Object.keys(names).sort((key1, key2) => names[key1].name.localeCompare(names[key2].name)).map(key => (
      <React.Fragment><li key={key}>{names[key].name}</li> <button onClick={() => deleteName(key)}>Delete name</button> </React.Fragment>
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
      <button onClick={doStuff}>
        Add
      </button>
    </div>
  );
};

RemoveDuplicatesComponent.propTypes = {
  firebase: any.isRequired,
  names: any
};

RemoveDuplicatesComponent.defaultProps = {
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
)(RemoveDuplicatesComponent);
