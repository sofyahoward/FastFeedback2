//understand reducers more
import { FETCH_USER } from '../actions/types';

//auth reducer is here to decide whether the user is currently logged in
export default function (state = null, action){
    console.log(action);
    switch (action.type) {
       case FETCH_USER:
            return action.payload || false;
       default:
            return state;
    }
}