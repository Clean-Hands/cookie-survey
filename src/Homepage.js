import React from 'react';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import { firebaseConnect} from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class Homepage extends React.Component {
  render() {

    return (
      <div>
        <h1>2024 Christmas Cookie Vote</h1>
        <h4>by Lazuli Kleinhans</h4>
        <hr/>
        <p>Welcome to the annual Christmas cookie vote for 2024!</p><br/>
        <br/>
        
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
  useNavigate,
  firebaseConnect(props => {
    return [{path: '/names', storeAs: 'names'}];
  }),
  connect(mapStateToProps)
)(Homepage);