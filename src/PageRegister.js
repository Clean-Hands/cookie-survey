import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { firebaseAuth, firebaseFirestore } from './index';

const PageRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const user = useSelector(state => state.auth.user);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setError('');
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'username':
        setUsername(value);
        break;
      default:
        setError('unknown event name')
    }
  };

  const register = async () => {
    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth, 
        email, 
        password
      );
      
      // Create user profile in Firestore
      await setDoc(doc(firebaseFirestore, 'users', userCredential.user.uid), {
        email,
        username,
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
    <div>
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
        <button 
          disabled={!username.trim()} 
          onClick={register}
        >
          Register
        </button>
      </div>
      <hr/>
      <Link to="/login">Login</Link>
      <br/>
      <Link to="/">Home</Link>
    </div>
  );
};

export default PageRegister;