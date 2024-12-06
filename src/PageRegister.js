import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { firebaseAuth, firebaseFirestore } from './index';

const PageRegister = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [error, setError] = useState('');

  const user = useSelector(state => state.auth.user);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setError('');
    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confPassword':
        setConfPassword(value);
        break;
      default:
        setError('unknown event name')
    }
  };

  const register = async () => {
    if (!username.trim()) {
      setError('Username may not be empty.');
      return;
    } else if (!email.trim()) {
      setError('Email may not be empty.');
      return;
    } else if (!password.trim()) {
      setError('Password may not be empty.');
      return;
    } else if (!confPassword.trim()) {
      setError('Please confirm your password.');
      return;
    } else if (password !== confPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth, 
        email.trim(), 
        password
      );
      
      // Create user profile in Firestore
      await setDoc(doc(firebaseFirestore, 'users', userCredential.user.uid), {
        email: email.trim(),
        username: username.trim(),
        createdAt: new Date(),
        lastModified: new Date(),
        lastLogin: new Date()
      });
    } catch (error) {
      setError(error.message);
    }
  };

  if (user) {
    return <Navigate to="/"/>
  }

  return (
    <div class="main-content">
      <h2>Register</h2>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      <div>
        <input 
          name="username" 
          onChange={handleInputChange} 
          placeholder="Username" 
          value={username}
        />
        <br/>
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
        <input 
          name="confPassword" 
          type="password" 
          onChange={handleInputChange} 
          placeholder="Confirm Password" 
          value={confPassword}
        />
        {/* TODO: confirm password */}
        <br/>
        <button 
          onClick={register}
        >
          Register
        </button>
      </div>
      <hr/>
      <Link tabindex="-1" to="/login"><button>Login</button></Link>
      <br/>
      <Link tabindex="-1" to="/"><button>Home</button></Link>
    </div>
  );
};

export default PageRegister;