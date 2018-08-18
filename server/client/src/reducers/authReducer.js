//understand reducers more
import { FETCH_USER } from '../actions/types';

//auth reducer is here to decide whether the user is currently logged in
//this reducer returns null if we dont know if a user is logged in, user model is the user is logged in or false if noone is logged in.
export default function (state = null, action){
    switch (action.type) {
       case FETCH_USER:
            return action.payload || false;
       default:
            return state;
    }
}