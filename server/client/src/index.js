//this file contains Redux 
//this file is also redering the app.js (main component)

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App'
//use JSX tags because react expects a component instance as an argument
ReactDOM.render(
    <App/>,
    document.querySelector('#root')
);