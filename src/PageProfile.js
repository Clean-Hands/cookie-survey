import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { updateEmail, updatePassword, signOut } from 'firebase/auth';
import { firebaseAuth, firebaseFirestore, setUser } from './index';


const PageProfile = () => {
  const user = useSelector(state => state.auth.user);
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
  });
  const [newEmail, setEmail] = useState('');
  const [newUsername, setUsername] = useState('');
  const [newPassword, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const dispatch = useDispatch();


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
          setSuccess('')
        }
      }
    };

    fetchUserProfile();
  }, [user]);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setError('');
    setSuccess('');
    switch (name) {
      case 'newEmail':
        setEmail(value);
        break;
      case 'newPassword':
        setPassword(value);
        break;
      case 'newUsername':
        setUsername(value);
        break;
      default:
        setError('unknown event name')
    }
  };


  const handleUpdateUsername = async () => {
    if (!newUsername.trim()) {
      setError('Username cannot be empty');
      setSuccess('')
      return;
    }

    try {
      const userDocRef = doc(firebaseFirestore, 'users', user.uid);
      await updateDoc(userDocRef, {username: newUsername, lastModified: new Date()});

      // Dispatch an action to update the user in Redux store
      dispatch(setUser({
        ...user,
        username: newUsername
      }));

      setProfileData(prev => ({ ...prev, username: newUsername }));
      setUsername('');

      setSuccess('Username updated successfully');
      setError('');
    } catch (error) {
      setError('Could not update username: ' + error.message);
      setSuccess('');
    }
  };


  const handleUpdateEmail = async () => {
    if (!newEmail.trim()) {
      setError('Email cannot be empty');
      setSuccess('');
      return;
    }

    try {
      if (firebaseAuth.currentUser) {
        await updateEmail(firebaseAuth.currentUser, newEmail);
        const userDocRef = doc(firebaseFirestore, 'users', user.uid);
        await updateDoc(userDocRef, {email: newEmail, lastModified: new Date()});

        // Dispatch an action to update the user in Redux store
        dispatch(setUser({
          ...user,
          email: newEmail
        }));

        setProfileData(prev => ({ ...prev, email: newEmail }));
        setEmail('');
        setSuccess('Email updated successfully');
        setError('');
      }
    } catch (error) {
      if (error.message === "Firebase: Error (auth/requires-recent-login).") {
        try {
          await signOut(firebaseAuth);
        } catch (error) {
          console.error("Logout error", error);
        }
        return;
      }
      setError('Could not update email: ' + error.message);
      setSuccess('');
    }
  };


  const handleUpdatePassword = async () => {
    if (!newPassword.trim()) {
      setError('Password cannot be empty');
      setSuccess('')
      return;
    }

    try {
      if (firebaseAuth.currentUser) {
        await updatePassword(firebaseAuth.currentUser, newPassword);
        const userDocRef = doc(firebaseFirestore, 'users', user.uid);
        await updateDoc(userDocRef, {lastModified: new Date()});
        setPassword('');
        setSuccess('Password updated successfully');
        setError('');
      }
    } catch (error) {
      setError('Could not update password: ' + error.message);
      setSuccess('')
    }
  };


  if (!user) {
    return <Navigate to="/login"/>;
  }


  return (
    <div class="main-content">
      <h2>My Profile</h2>
      
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}

      <div>
        <h3>Current Profile</h3>
        <p>Username: {profileData.username}</p>
        <p>Email: {profileData.email}</p>
      </div>

      <div>
        <h4>Update Username</h4>
        <input 
          name="newUsername"
          value={newUsername}
          onChange={handleInputChange}
          placeholder="New Username"
        />
        <button onClick={handleUpdateUsername}>Update Username</button>
      </div>

      <div>
        <h4>Update Email</h4>
        <input 
          name="newEmail"
          value={newEmail}
          onChange={handleInputChange}
          placeholder="New Email"
        />
        <button onClick={handleUpdateEmail}>Update Email</button>
      </div>

      <div>
        <h4>Update Password</h4>
        <input 
          type="password"
          name="newPassword"
          value={newPassword}
          onChange={handleInputChange}
          placeholder="New Password"
        />
        <button onClick={handleUpdatePassword}>Update Password</button>
      </div>

      <hr/>
      <Link to="/">
        <button>Home</button>
      </Link>
    </div>
  );
};

export default PageProfile;