import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { updateEmail, updatePassword } from 'firebase/auth';
import { firebaseAuth, firebaseFirestore } from './index';

const PageProfile = () => {
  const user = useSelector(state => state.auth.user);
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
  });
  const [newEmail, setNewEmail] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        try {
          const userDocRef = doc(firebaseFirestore, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            setProfileData({
              username: userDoc.data().username || '',
              email: user.email || '',
            });
          }
        } catch (error) {
          setError('Could not fetch user profile: ' + error.message);
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleUpdateUsername = async () => {
    if (!newUsername.trim()) {
      setError('Username cannot be empty');
      return;
    }

    try {
      const userDocRef = doc(firebaseFirestore, 'users', user.uid);
      await updateDoc(userDocRef, { username: newUsername });
      
      setProfileData(prev => ({ ...prev, username: newUsername }));
      setNewUsername('');
      setSuccess('Username updated successfully');
      setError('');
    } catch (error) {
      setError('Could not update username: ' + error.message);
    }
  };

  const handleUpdateEmail = async () => {
    if (!newEmail.trim()) {
      setError('Email cannot be empty');
      return;
    }

    try {
      if (firebaseAuth.currentUser) {
        await updateEmail(firebaseAuth.currentUser, newEmail);
        setProfileData(prev => ({ ...prev, email: newEmail }));
        setNewEmail('');
        setSuccess('Email updated successfully');
        setError('');
      }
    } catch (error) {
      setError('Could not update email: ' + error.message);
    }
  };

  const handleUpdatePassword = async () => {
    if (!password.trim()) {
      setError('Password cannot be empty');
      return;
    }

    try {
      if (firebaseAuth.currentUser) {
        await updatePassword(firebaseAuth.currentUser, password);
        setPassword('');
        setSuccess('Password updated successfully');
        setError('');
      }
    } catch (error) {
      setError('Could not update password: ' + error.message);
    }
  };

  if (!user) {
    return <Navigate to="/login"/>;
  }

  return (
    <div>
      <h2>My Profile</h2>
      
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}

      <div>
        <h3>Current Profile</h3>
        <p>Username: {profileData.username}</p>
        <p>Email: {profileData.email}</p>
      </div>

      <div>
        <h3>Update Username</h3>
        <input 
          name="newUsername"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          placeholder="New Username"
        />
        <button onClick={handleUpdateUsername}>Update Username</button>
      </div>

      <div>
        <h3>Update Email</h3>
        <input 
          name="newEmail"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="New Email"
        />
        <button onClick={handleUpdateEmail}>Update Email</button>
      </div>

      <div>
        <h3>Update Password</h3>
        <input 
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
        />
        <button onClick={handleUpdatePassword}>Update Password</button>
      </div>

      <hr/>
      <Link to="/">Home</Link>
    </div>
  );
};

export default PageProfile;