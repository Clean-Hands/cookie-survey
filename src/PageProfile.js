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
			setError('Username may not be empty.');
			setSuccess('')
			return;
		}

		try {
			const userDocRef = doc(firebaseFirestore, 'users', user.uid);
			await updateDoc(userDocRef, {username: newUsername.trim(), lastModified: new Date()});

			// Dispatch an action to update the user in Redux store
			dispatch(setUser({
				...user,
				username: newUsername.trim()
			}));

			setProfileData(prev => ({ ...prev, username: newUsername.trim() }));
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
			setError('Email may not be empty.');
			setSuccess('');
			return;
		}

		try {
			if (firebaseAuth.currentUser) {
				await updateEmail(firebaseAuth.currentUser, newEmail.trim());
				const userDocRef = doc(firebaseFirestore, 'users', user.uid);
				await updateDoc(userDocRef, {email: newEmail.trim(), lastModified: new Date()});

				// Dispatch an action to update the user in Redux store
				dispatch(setUser({
					...user,
					email: newEmail.trim()
				}));

				setProfileData(prev => ({ ...prev, email: newEmail.trim() }));
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
			setError('Password may not be empty.');
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

			<div>
				<p><b>Username:</b> {profileData.username}</p>
				<p><b>Email:</b> {profileData.email}</p>
			</div>
			<br/>
			<div>
				{error && <div style={{ color: 'red' }}>{error}</div>}
				{success && <div style={{ color: 'green' }}>{success}</div>}
				<h4>Update Username</h4>
				<input 
					name="newUsername"
					value={newUsername}
					onChange={handleInputChange}
					placeholder="New Username"
				/>
				<button onClick={handleUpdateUsername}>Update</button>
			</div>

			<div>
				<h4>Update Email</h4>
				<input 
					name="newEmail"
					value={newEmail}
					onChange={handleInputChange}
					placeholder="New Email"
				/>
				<button onClick={handleUpdateEmail}>Update</button>
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
				<button onClick={handleUpdatePassword}>Update</button>
			</div>

			{/* TODO: past years' ballots */}

			<hr/>
			<Link tabindex="-1" to="/">
				<button>Home</button>
			</Link>
		</div>
	);
};

export default PageProfile;