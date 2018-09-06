//axios allows us to make ajax requests
import axios from 'axios';
import {FETCH_USER, FETCH_SURVEYS} from './types';

//action creater that allows us to see if the user is logged in
//action  creator returns an actiont hat is sent to reducers and updates state in redux store, which then changes react components through re-render

//redux thunk allows us to call the action after the promise is resolved instead of immediately through having direct access to the dispatch function
export const fetchUser = () => async dispatch => {
   const res = await axios.get('/api/current_user');
   dispatch({type: FETCH_USER, payload: res.data});
}

//send a post request to the user model utilizing the token we have received from stripe and then fetch the new user model showing how many credits the user now has after payment.
export const handleToken = token => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    dispatch({type: FETCH_USER, payload: res.data});
}
export const submitSurvey = (values, history) => async dispatch => {
    const res = await axios.post('/api/surveys', values);

    // use with router to navigate to /surveys upon submitting the form
    history.push('/surveys');
    dispatch({type: FETCH_USER, payload: res.data});
};

//action creator to get the list of surveys
export const fetchSurveys = () => async dispatch => {
    const res = await axios.get('/api/surveys');
    //payload is getting the list of surveys we got from the request right above assigned to const res. So the payload will be an array of all surveys that a current user has sent out.
    dispatch({ type: FETCH_SURVEYS, payload: res.data })
}