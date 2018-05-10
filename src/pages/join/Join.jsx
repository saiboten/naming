import React from 'react';
import { func, string, any, bool } from 'prop-types';

// import { LinkButton } from '../../components/LinkButton';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';

import { LinkButton } from '../../components/LinkButton';
import { joinFailedAction, joinSuccessAction, clearJoinStatusAction } from '../../state/actions/name';

export class JoinComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: ''
    };

    this.submit = this.submit.bind(this);
    this.idChanged = this.idChanged.bind(this);
  }

  idChanged(e) {
    this.setState({
      id: e.target.value
    });
  }

  submit(e) {
    e.preventDefault();

    this.props.join(this.props.uid, this.state.id);
    this.setState({
      id: ''
    });
  }

  render() {
    const {
      availableNicknames, joinSuccess, joinFailed, addFoundNickToCurrentUser
    } = this.props;
    const availableNicknamesJsx =
    Object.keys(availableNicknames)
      .filter(key => availableNicknames[key])
      .map(key => (
        <li key={key}>
          {availableNicknames[key].nickname}
          <button onClick={() => addFoundNickToCurrentUser(key, availableNicknames[key].nickname)}>Legg til</button>
        </li>));

    return (
      <div className="createname">
        <h2 className="createname__sub-heading heading-primary">Samarbeid med andre</h2>
        <p className="createname__explanation">For å kunne samarbeide med andre må de gi deg en magisk påmeldingskode som du skriver inn under.</p>
        <form className="createname__form" onSubmit={this.submit}>
          <input className="createname__name" onChange={this.idChanged} type="text" value={this.state.id} placeholder="Magisk kode" />
          <div className="createname__navigation">
            <LinkButton to="/" extraClass="button--small button--secondary">Tilbake</LinkButton>
            <input className="button button--small createname__submit" type="submit" value="OK" />
          </div>
        </form>
        <ul>
          {availableNicknamesJsx}
        </ul>
        {joinSuccess ? (<div>Det gikk bra</div>) : null}
        {joinFailed ? (<div>Det gikk dårlig, bu</div>) : null}

      </div>);
  }
}

JoinComponent.propTypes = {
  join: func.isRequired,
  addFoundNickToCurrentUser: func.isRequired,
  uid: string,
  availableNicknames: any,
  joinSuccess: bool,
  joinFailed: bool
};

JoinComponent.defaultProps = {
  uid: '',
  availableNicknames: {},
  joinSuccess: false,
  joinFailed: false
};

export const Join = compose(
  withFirebase,
  connect(
    ({ firebase, name: { joinSuccess, joinFailed } }) => ({
      uid: firebase.auth.uid,
      email: firebase.auth.email,
      availableNicknames: firebase.data.nicknames,
      joinSuccess,
      joinFailed,
      firebase
    }),
    (dispatch, { firebase }) => ({
      join: (uid, id) => {
        const dbRef = firebase.database().ref(`nicknames/${id}`);
        dbRef.once('value', (snapshot) => {
          if (snapshot.val()) {
            dispatch(joinSuccessAction());
            firebase.watchEvent('value', `nicknames/${id}`);
          } else {
            dispatch(joinFailedAction());
          }

          setTimeout(() => {
            dispatch(clearJoinStatusAction());
          }, 5000);
        });
      },
      addFoundNickToCurrentUser: (nickIdToAdd, nick) => {
        dispatch((dispatcher, getState, theFirebase) => {
          const { firebase: { auth: { uid } } } = getState();
          theFirebase().set(`users/${uid}/nicknames/${nickIdToAdd}`, {
            nickname: nick
          });
        });
      }
    })
  )
)(JoinComponent);
