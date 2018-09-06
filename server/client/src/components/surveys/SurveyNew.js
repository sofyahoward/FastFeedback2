//SurveyNew shows SurveyForm and SurveyFormReview

import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
    state = {showFormReview: false};

    renderContent(){
        if(this.state.showFormReview){
            // when the user clicks on cancel button, bring them back to the previous screen
            return <SurveyFormReview
                onCancel={() => this.setState({showFormReview: false})}
            />;
        };

        return <SurveyForm onSurveySubmit={()=> this.setState({showFormReview: true})}/>;
        // when the user submits the form, we run the callback on SurveySubmit and change the state to true, and as a result, get to the show form review view.
    }

    render(){
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}
export default reduxForm({
    // this allows us to dump the values once the user navigates away from the surveyNew component.
    form: 'surveyForm'
})(SurveyNew);