import React from 'react';
// import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link, Navigate } from 'react-router-dom';

class PageLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  handleInputChange = event => {
    this.setState({[event.target.name]: event.target.value, error: ''});
  }

  login = async () => {
    const credentials = {
      email: this.state.email,
      password: this.state.password,
    }
    try {
      await this.props.firebase.login(credentials);
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
        <h2>Login</h2>
        <div>{this.state.error}</div>
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
  // return {isLoggedIn: state.firebase.auth.uid};
}

export default compose(
  // firebaseConnect(),
  connect(mapStateToProps),
)(PageLogin);