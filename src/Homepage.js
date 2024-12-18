import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from './index';

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
		<div class="main-content">
			<h1>2024 Christmas Cookie Survey</h1>
			<i>by Lazuli Kleinhans</i>
			<hr/>
			<p>The 2024 Christmas cookie survey has finished!</p>

			{user ? (
				<div>
					<Link tabindex="-1" to="/results">
						<button>View Results</button>
					</Link>
				</div>
			) : (
				<div>
					<p>You must be logged in to view the results.</p>
				</div>
			)}
			
			<h3>Account</h3>
			{user ? (
				<div>
					<div>
						{user.email} - <Link to="/profile">My Profile</Link>
					</div>
					<button onClick={handleLogout}>Logout</button>
				</div> 
			) : (
				<div>
					<Link tabindex="-1" to="/register">
						<button>Register</button>
					</Link> <Link tabindex="-1" to="/login">
						<button>Login</button>
					</Link>
				</div>
			)}
		</div>
	);
};

export default Homepage;