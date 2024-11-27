import React from 'react';
import './CardEditor.css';
import { Link, withRouter } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class Homepage extends React.Component {
  render() {

    let decks;
    if (!isLoaded(this.props.decks)) {
      decks = <div>Loading...</div>
    } else if (isEmpty(this.props.decks)) {
      decks = <div>No decks found</div>
    } else {
      const keys = Object.keys(this.props.decks);
      decks = keys.map(key => {
        if (this.props.decks[key].isPublic || this.props.decks[key].owner === this.props.isLoggedIn) {
          const name = this.props.decks[key].name;
          return(<div><Link to={`/viewer/${key}`}>{name}</Link></div>)
        }
        return '';
      })
    }

    return (
      <div>
        <h1>Flash Cards Application</h1>
        <h4>by Caelan Kleinhans</h4>
        <hr/>
        <p>Welcome to the flash cards application! Use one of the following links to navigate to either create a new deck or view existing ones.</p><br/>
        <Link to="/editor">Create New Deck</Link><br/>
        <br/>
        <h3>Decks</h3>
        {decks}

        <h3>Account</h3>
        {this.props.isLoggedIn ? (
          <div>
            <div>{this.props.email}</div>
            <button onClick={() => this.props.firebase.logout()}>Logout</button><br/>
            <Link to="/profile">My Profile</Link>
          </div> 
        ) : (
          <div>
            <Link to="/register">Register</Link>
            <br/>
            <Link to="/login">Login</Link>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return({
    decks: state.firebase.data['names'],
    email: state.firebase.auth.email,
    isLoggedIn: state.firebase.auth.uid,
  });
}

export default compose(
  withRouter,
  firebaseConnect(props => {
    return [{path: '/names', storeAs: 'names'}];
  }),
  connect(mapStateToProps)
)(Homepage);