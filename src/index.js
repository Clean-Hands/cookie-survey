import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { configureStore } from '@reduxjs/toolkit';
import { firebaseReducer } from 'react-redux-firebase';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

import App from './App';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoJhrMeILouXe88-URbvVLcIdM2IjpCUY",
  authDomain: "cookie-survey.firebaseapp.com",
  databaseURL: "https://cookie-survey-default-rtdb.firebaseio.com",
  projectId: "cookie-survey",
  storageBucket: "cookie-survey.firebasestorage.app",
  messagingSenderId: "968974432555",
  appId: "1:968974432555:web:06fdc5669b9313c64f2d6e"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

// Redux
const store = configureStore({
  reducer: {
    firebase: firebaseReducer
  },
  // Optional: disable Redux DevTools in production
  devTools: process.env.NODE_ENV !== 'production',
});

const rrfConfig = {
  userProfile: 'users'
  // Populate user profile using Firestore
  // useFirestoreForProfile: true 
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider
        firebase={firebaseApp}
        config={rrfConfig}
        dispatch={store.dispatch}
      >
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>
);