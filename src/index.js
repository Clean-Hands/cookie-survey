import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
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
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDatabase = getDatabase(firebaseApp);

// Create auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoading: true
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoading = false;
    }
  }
});

export const { setUser, clearUser } = authSlice.actions;

// Redux Store
const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false
    })
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);