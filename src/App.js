import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';

import Homepage from './Homepage.js';
import PageRegister from './PageRegister.js';
import PageLogin from './PageLogin.js';
import PageProfile from './PageProfile.js';

const App = props => {
  // if (!isLoaded(props.auth, props.profile)) {
  //   return <div>Authentication loading...</div>
  // }

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

const mapStateToProps = state => {
  return {auth: state.firebase.auth, profile: state.firebase.profile};
}

export default connect(mapStateToProps)(App);