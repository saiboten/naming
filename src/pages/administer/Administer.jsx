import React from 'react';

import { string, func, any } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

import { logProps } from '../renderer/loadingRenderHoc';
import { LinkButton } from '../../components/LinkButton';

class AdministerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: ''
    };

    this.updateMail = this.updateMail.bind(this);
    this.submit = this.submit.bind(this);
  }

  updateMail(e) {
    e.preventDefault();
    this.setState({
      mail: e.target.value
    });
  }

  submit(e) {
    const { addUser, nick } = this.props;

    e.preventDefault();
    addUser(nick, this.state.mail);
    this.setState({
      mail: ''
    });
  }

  render() {
    const { participants, nick } = this.props;

    return (
      <div>
        <form onSubmit={this.submit}>
          <h2 className="heading-primary">Legg til bruker</h2>
          <input type="text" className="input" onChange={this.updateMail} placeholder="Epost" />
          <input className="button" type="submit" value="Legg til" />
        </form>

        <p>Deltagere:</p>
        <ul>
          {Object.values(participants).map(participant => (<li key={participant}>{participant}</li>))}
        </ul>

        <p>Magisk kodeord de må legge inn for å bli med</p>
        <p>{nick}</p>

        <LinkButton extraClass="nameactions__back button--small button--secondary" to="/">Tilbake</LinkButton>
      </div>);
  }
}

AdministerComponent.propTypes = {
  nick: string.isRequired,
  addUser: func.isRequired,
  participants: any
};

AdministerComponent.defaultProps = {
  participants: {}
};

export const Administer = compose(
  logProps,
  firebaseConnect(({ match: { params: { nick } } }) => [
    `nicknames/${nick}/participants`
  ]),
  connect(
    ({ firebase: { data: { nicknames } } }, { match: { params: { nick } } }) => ({ nick, participants: nicknames && nicknames[nick] ? nicknames[nick].participants : [] }),
    dispatch => ({
      addUser: (nick, mail) => {
        dispatch((dispatcher, getState, firebase) => {
          firebase().push(`nicknames/${nick}/participants`, mail);
        });
      }
    })
  )
)(AdministerComponent);
