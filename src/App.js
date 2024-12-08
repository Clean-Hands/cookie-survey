import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from './index';
import { setUser, clearUser } from './index';

import Homepage from './Homepage.js';
import PageRegister from './PageRegister.js';
import PageLogin from './PageLogin.js';
import PageProfile from './PageProfile.js';
import PagePasswordReset from './PagePasswordReset.js';
import Vote2024 from './Vote2024.js';
import VoteSuccess from './VoteSuccess.js';
import './App.css';


const App = () => {
	const dispatch = useDispatch();
	const { isLoading } = useSelector(state => state.auth);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
			if (currentUser) {
				dispatch(setUser({
					uid: currentUser.uid,
					email: currentUser.email
				}));
			} else {
				dispatch(clearUser());
			}
		});

		return () => unsubscribe();
	}, [dispatch]);

	if (isLoading) {
		return <div class="main-content">
				   <p>Authentication loading...</p>
			   </div>;
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/register" element={<PageRegister />} />
				<Route path="/login" element={<PageLogin />} />
				<Route path="/profile" element={<PageProfile />} />
				<Route path="/reset-password" element={<PagePasswordReset />} />
				<Route path="/vote" element={<Vote2024 />} />
				<Route path="/success" element={<VoteSuccess />} />
				<Route path="*" element={<div class="main-content">
											 <h1>Page not found :(</h1>
											 <br/>
											 <Link tabindex="-1" to="/">
												 <button>Home</button>
											 </Link>
										 </div>}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default App;