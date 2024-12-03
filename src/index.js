// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { initializeApp, firebase } from "firebase/app";
import 'firebase/database';
import 'firebase/auth';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { ReactReduxFirebaseProvider, firebaseReducer } from 'react-redux-firebase';
import { composeWithDevTools } from 'redux-devtools-extension';


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
const app = initializeApp(firebaseConfig);

// const rootReducer = combineReducers({
//   firebase: firebaseReducer
//   // firestore: firestoreReducer // <- needed if using firestore
// })

// // Create store with reducers and initial state
// const store = createStore(rootReducer, composeWithDevTools())

// // react-redux-firebase config
// const rrfConfig = {
//   userProfile: 'users',
//   preserveOnLogout: ['names'],
//   // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
//   // enableClaims: true // Get custom claims along with the profile
// }

// const rrfProps = {
//   firebase,
//   config: rrfConfig,
//   dispatch: store.dispatch
//   // createFirestoreInstance // <- needed if using firestore
// }

// ReactDOM.render(
//   <Provider store={store}>
//     <ReactReduxFirebaseProvider {...rrfProps}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </ReactReduxFirebaseProvider>
//   </Provider>,
//   document.getElementById('root')
// );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);