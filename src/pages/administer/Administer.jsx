import React from 'react';

import { string, func } from 'prop-types';

import { connect } from 'react-redux';
import { LinkButton } from '../../components/LinkButton';

class AdministerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: ''
    };

    this.updateMail = this.updateMail.bind(this);
  }

  updateMail(e) {
    e.preventDefault();
    this.setState({
      mail: e.target.value
    });
  }

  render() {
    const { addUser, nick } = this.props;

    return (
      <div>
        <form onSubmit={(e) => { e.preventDefault(); addUser(nick, this.state.mail); }}>
          <h2 className="heading-primary">Legg til bruker</h2>
          <input type="text" className="input" onChange={this.updateMail} placeholder="Epost" />
          <input className="button" type="submit" value="Legg til" />
        </form>

        <LinkButton extraClass="nameactions__back button--small button--secondary" to="/">Tilbake</LinkButton>
      </div>);
  }
}

AdministerComponent.propTypes = {
  nick: string.isRequired,
  addUser: func.isRequired
};

export const Administer = connect(
  (state, { match: { params: { nick } } }) => ({ nick }),
  dispatch => ({
    addUser: (nick, mail) => {
      dispatch((dispatcher, getState, firebase) => {
        const { firebase: { auth: { uid } } } = getState();
        console.log(uid, nick, mail, firebase);
      });
    }
  })
)(AdministerComponent);
