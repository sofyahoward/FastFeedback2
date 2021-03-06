//React allows use of 2015 modules and there use import statements
//common js modules are in node JS on teh back end and use require statements
import React, { Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from '../components/header/Header';
import Landing from '../components/landing/Landing';
import Dashboard from '../components/Dashboard/Dashboard';
import SurveyNew from './surveys/SurveyNew';
import FooterPg from '../components/footer/Footer';



class App extends Component{
   //once the component has mounted, check if the use is signed in
   //we are using connect component of react-redux to be able to call action creators
    componentDidMount(){
        this.props.fetchUser();
   }

    render() {
        return (
            //container className makes the form the size that it currently is
            <div>
               <BrowserRouter>
                    <div>
                       <Header/>
                       <Route exact path = "/" component={Landing}/>
                       <Route exact path = "/surveys" component={Dashboard}/>
                       <Route exact path = "/surveys/new" component={SurveyNew}/>
                       <FooterPg/>
                    </div>
               </BrowserRouter>
            </div>
        );
    } 
};
export default connect(null, actions)(App);