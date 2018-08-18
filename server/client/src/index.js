//this file contains Redux 
//this file is also redering the app.js (main component)
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';


import App from './components/App';
import reducers from './reducers';

//this allows us to test post request in console and still have cookies from authentication
import axios from 'axios';
window.axios = axios;

//creating a redux store for state management
//first argument is a reducer, second is initial state usually usefull for server side rendering, which is not necessary for us. So we put an empty object, the third is our middlewear.
const store = createStore(reducers, {}, applyMiddleware(reduxThunk))

//use JSX tags because react expects a component instance as an argument
ReactDOM.render(
    //provider tag is a react component that brings together the react and redux sides of the application together. It informs all of its' child components (App) that a new state is available through Redux.
    <Provider store={store}><App/></Provider>,
    document.querySelector('#root')
);

