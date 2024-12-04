import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from './index';
import './App.css';

const Homepage = () => {
  const user = useSelector(state => state.auth.user);

  const handleLogout = async () => {
    try {
      await signOut(firebaseAuth);
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <div>
      <h1>2024 Christmas Cookie Vote</h1>
      <h4>by Lazuli Kleinhans</h4>
      <hr/>
      <p>Welcome to the annual Christmas cookie vote for 2024!</p><br/>
      
      <h3>Account</h3>
      {user ? (
        <div>
          <div>{user.email}</div>
          <button onClick={handleLogout}>Logout</button><br/>
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
};

export default Homepage;