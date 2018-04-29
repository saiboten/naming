import React from 'react';
// import { LinkButton } from '../../components/LinkButton';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

import './CreateName.scss';

export const CreateNameComponent = () => (
  <div className="createname">
    <h2 className="createname__sub-heading">Velg kallenavn</h2>
    <form className="createname__form">
      <input className="createname__name" type="text" placeholder="Kallenavn" />
      <div className="createname__radio-group">
        <div className="createname__radio-option">
          <input className="createname__radio" id="boy" name="gender" type="radio" value="boy" />
          <label className="createname__radio-label"htmlFor="boy">Gutt</label>
        </div>

        <div className="createname__radio-option">
          <input className="createname__radio" id="girl" name="gender" type="radio" value="girl" />
          <label className="createname__radio-label" htmlFor="girl">Jente</label>
        </div>
      </div>
      <input className="createname__submit" type="submit" value="OK" />
    </form>

  </div>);

export const CreateName = compose(
  firebaseConnect([
    { path: '/names' } // { path: '/names' } // object notation
  ]),
  connect(state => ({
    names: state.firebase.data.names,
    // profile: state.firebase.profile // load profile
  }))
)(CreateNameComponent);
