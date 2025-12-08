import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { firebaseAuth } from './index';

const PageLogin = () => {
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		if (name === 'email') {
			setEmail(value);
		}
		setError('');
		setSuccess('');
	};

	const handlePasswordReset = async () => {
        if (!email.trim()) {
			setError('Email is required to reset password.');
            return;
        }

        try {
            await sendPasswordResetEmail(firebaseAuth, email);
			setSuccess('Password reset email sent. Please check your inbox to complete the process.')
            setError('');
        } catch (e) {
            setError(e.message);
        }
    };

	return (
		<div class="main-content">
			<h2>Reset Password</h2>
			<p>Please enter your email in order to reset your password.</p>
			<br/>
			{error && <div style={{ color: 'red' }}>{error}</div>}
			{success && <div style={{ color: 'green' }}>{success}</div>}
			<div>
				<input 
					name="email" 
					onChange={handleInputChange} 
					placeholder="Email" 
					value={email}
				/>
			</div>
			<button onClick={handlePasswordReset}>
				Submit
			</button>
			<hr/>
			<Link tabindex="-1" to="/"><button>Home</button></Link>
		</div>
	);
};

export default PageLogin;