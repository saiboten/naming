import React from 'react';
import { func, string } from 'prop-types';

// import { LinkButton } from '../../components/LinkButton';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';

import { LinkButton } from '../../components/LinkButton';

import './CreateName.scss';

export class CreateNameComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      boy: true,
      nickname: ''
    };

    this.submit = this.submit.bind(this);
    this.itsaboy = this.itsaboy.bind(this);
    this.itsagirl = this.itsagirl.bind(this);
    this.nameChanged = this.nameChanged.bind(this);
  }

  nameChanged(e) {
    this.setState({
      nickname: e.target.value
    });
  }

  itsaboy() {
    this.setState({
      boy: true
    });
  }

  itsagirl() {
    this.setState({
      boy: false
    });
  }

  submit(e) {
    e.preventDefault();
    // Do stuff

    const { nickname, boy } = this.state;


    this.props.addNickName({
      nickname,
      boy,
      uid: this.props.uid
    });
  }

  render() {
    return (
      <div className="createname">
        <h2 className="createname__sub-heading">Velg kallenavn</h2>
        <p className="createname__explanation">For at vi skal kunne forstå hvem du forsøker å navngi, må du oppgi et kallenavn. Dette kallenavnet kan være hva som helst, f.eks &quot;Junior&quot;, &quot;Småen&quot;, &quot;Nye Hund 2019&quot; eller noe helt annet.</p>
        <form className="createname__form" onSubmit={this.submit}>
          <input className="createname__name" onChange={this.nameChanged} type="text" value={this.state.nickname} placeholder="Kallenavn" />
          <div className="createname__radio-group">
            <p>Jeg ser etter et: </p>
            <div className="createname__radio-option">
              <input className="createname__radio" id="boy" onChange={this.itsagirl} checked={this.state.boy} name="gender" type="radio" value="boy" />
              <label className="createname__radio-label" htmlFor="boy">Guttenavn</label>
            </div>

            <div className="createname__radio-option">
              <input className="createname__radio" id="girl" checked={this.state.girl} onChange={this.itsaboy} name="gender" type="radio" value="girl" />
              <label className="createname__radio-label" htmlFor="girl">Jentenavn</label>
            </div>
          </div>
          <div className="createname__navigation">
            <LinkButton to="/" extraClass="button--small button--secondary">Tilbake</LinkButton>
            <input className="button button--small createname__submit" type="submit" value="OK" />
          </div>
        </form>

      </div>);
  }
}

CreateNameComponent.propTypes = {
  addNickName: func.isRequired,
  uid: string
};

CreateNameComponent.defaultProps = {
  uid: ''
};

export const CreateName = compose(withFirebase, connect(
  ({ firebase }) => ({
    uid: firebase.auth.uid,
    firebase
  }),
  (dispatch, { firebase, history }) => ({
    addNickName: ({ uid, nickname, boy }) => {
      firebase.push(`nicknames/${uid}`, {
        nickname,
        boy
      });
      history.push('/');
    }
  })
))(CreateNameComponent);
