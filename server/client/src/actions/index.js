//axios allows us to make ajax requests
import axios from 'axios';
import {FETCH_USER} from './types';

//action creater that allows us to see if the user is logged in
//action  creatorreturns an actiont hat is sent to  reducers and updates state in redux store, which then changes react components through re-render

//redux thunk allows us to call the action after the promise is resolved instead of immediately through having direct access to the dispatch function
export const fetchUser = () => async dispatch => {
   const res = await axios.get('/api/current_user');
   dispatch({type: FETCH_USER, payload: res.data});
}

