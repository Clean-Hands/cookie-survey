import React from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';

import CardEditor from './CardEditor.js';
import CardViewer from './CardViewer.js';
import Homepage from './Homepage.js';
import PageRegister from './PageRegister.js';
import PageLogin from './PageLogin.js';
import PageProfile from './PageProfile.js';

const App = props => {
  if (!isLoaded(props.auth, props.profile)) {
    return <div>Authentication loading...</div>
  }

  return(
  <Switch>
    {/* <Route exact path="/">
      <Homepage />
    </Route> */}
    <Route exact path="/register">
      <PageRegister/>
    </Route>
    <Route exact path="/login">
      <PageLogin/>
    </Route>
    <Route>
      <div>Page not found</div>
    </Route>
  </Switch>
  );
};

const mapStateToProps = state => {
  return {auth: state.firebase.auth, profile: state.firebase.profile};
}

export default connect(mapStateToProps)(App);