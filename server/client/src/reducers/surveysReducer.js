import { FETCH_SURVEYS } from '../actions/types';
//by default state is an empty array because the reducer should be rendering a list of surveys and that list is empty when the app boots up until we fetch a list of surveys
export default function (state = [], action){
    switch (action.type) {
       case FETCH_SURVEYS:
            return action.payload;
       default:
            return state;
    }
}