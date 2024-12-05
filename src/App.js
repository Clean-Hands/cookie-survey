import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from './index';
import { setUser, clearUser } from './index';

import Homepage from './Homepage.js';
import PageRegister from './PageRegister.js';
import PageLogin from './PageLogin.js';
import PageProfile from './PageProfile.js';

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
    return <div>Authentication loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<PageRegister />} />
        <Route path="/login" element={<PageLogin />} />
        <Route path="/profile" element={<PageProfile />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;