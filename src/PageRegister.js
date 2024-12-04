import React from 'react';
// import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link, Navigate } from 'react-router-dom';

class PageRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
    }
  }

  handleInputChange = event => {
    this.setState({[event.target.name]: event.target.value, error: ''});
  }

  register = async () => {
    const credentials = {
      email: this.state.email,
      password: this.state.password,
    }

    const profile = {
      email: this.state.email,
      username: this.state.username,
    }

    try {
      await this.props.firebase.createUser(credentials, profile);
    } catch (error) {
      this.setState({error: error.message});
    }
  };

  render() {
    if (this.props.isLoggedIn) {
      return <Navigate to="/"/>
    }

    return (
      <div>
        <h2>Register</h2>
        <div>{this.state.error}</div>
        <div>
          <input name="username" onChange={this.handleInputChange} placeholder="Username" value={this.state.username}/>
          <br/>
          <input name="email" onChange={this.handleInputChange} placeholder="Email" value={this.state.email}/>
          <br/>
          <input name="password" type="password" onChange={this.handleInputChange} placeholder="Password" value={this.state.password}/>
          <br/>
          <button disabled={!this.state.username.trim()} onClick={this.register}>Register</button>
        </div>
        <hr/>
        <Link to="/login">Login</Link>
        <br/>
        <Link to="/">Home</Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // return {isLoggedIn: state.firebase.auth.uid};
}

export default compose(
  // firebaseConnect(),
  connect(mapStateToProps),
)(PageRegister);