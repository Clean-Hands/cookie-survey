import React from 'react';
import {firebaseConnect} from 'react-redux-firebase';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Link, Redirect} from 'react-router-dom';

class PageProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newUsername: '',
    }
  }

  handleInputChange = event => {
    this.setState({[event.target.name]: event.target.value, error: ''});
  }

  changeUsername = async () => {
    try {
      // TODO
    } catch (error) {
      this.setState({error: error.message});
    }
  };

  render() {
    if (!this.props.isLoggedIn) {
      return <Redirect to="/login"/>
    }

    return (
      <div>
        <h2>My Profile</h2>
        <div>
          <input name="email" onChange={this.handleInputChange} placeholder="Email" value={this.state.email}/>
          <br/>
          <input name="password" type="password" onChange={this.handleInputChange} placeholder="Password" value={this.state.password}/>
          <br/>
          <button onClick={this.login}>Login</button>
        </div>
        <hr/>
        <Link to="/register">Register</Link>
        <br/>
        <Link to="/">Home</Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {isLoggedIn: state.firebase.auth.uid};
}

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(PageProfile);