//React allows use of 2015 modules and there use import statements
//common js modules are in node JS on teh back end and use require statements
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

const Header = () => <h2>Header</h2>
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>
const Landing = () => <h2>Landing</h2>

const  App = () => {
    return (
        <div>
           <BrowserRouter>
                <div>
                   <Header/>
                   <Route exact path = "/" component={Landing}/>
                   <Route exact path = "/surveys" component={Dashboard}/>
                   <Route exact path = "/surveys/new" component={SurveyNew}/>
                </div>
           </BrowserRouter>
        </div>
    );
};
export default App;