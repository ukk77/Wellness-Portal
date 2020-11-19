import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthProvider from './Context/AuthContext'

//index page of client, where everything starts
//Authprovider is the context api concept that is used for state sharing in react.js
//Everything is added between Authprovider tags so that the context api can be used everywhere in the app.

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
