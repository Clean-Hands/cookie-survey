import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { firebaseAuth, firebaseFirestore } from './index';

const PageLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const user = useSelector(state => state.auth.user);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
    setError('');
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  if (user) {
    const userDocRef = doc(firebaseFirestore, 'users', user.uid);
    updateDoc(userDocRef, {lastLogin: new Date()});
    return <Navigate to="/"/>
  }

  return (
    <div class="main-content">
      <h2>Login</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        <input 
          name="email" 
          onChange={handleInputChange} 
          placeholder="Email" 
          value={email}
        />
        <br/>
        <input 
          name="password" 
          type="password" 
          onChange={handleInputChange} 
          placeholder="Password" 
          value={password}
        />
        <br/>
        <button 
          disabled={!email.trim() || !password.trim()}
          onClick={login}
        >
          Login</button>
      </div>
      {/* TODO: Forgot password link */}
      <hr/>
      <Link to="/register"><button>Register</button></Link>
      <br/>
      <Link to="/"><button>Home</button></Link>
    </div>
  );
};

export default PageLogin;