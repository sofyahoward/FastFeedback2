// SurveyFormReview shows users their form inputs for review
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import {withRouter} from 'react-router-dom';
import * as actions from '../../actions';

//destructuring. Instead of receiving all props, we just want to use onCancel and formValues that we have assigned values down below in mapStateToProps
const SurveyFormReview = ({onCancel, formValues, submitSurvey, history}) => {

    const reviewFields = _.map(formFields, field => {
        return (
            <div key={field.name}>
                <label>{field.label}</label>
                <div>
                    {formValues[field.name]}
                </div>
            </div>
        )
    })

    return (
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            
            <button className="yellow darken-3 white-text btn-flat" onClick={onCancel}>
                Back
            </button>
            <button 
            // arrow function makes sure the function is not immediately executed
                onClick={() => submitSurvey(formValues, history)}
                className='green btn-flat right white-text'>
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
};

//formValues is being passed as props to SurveyFormReview
function mapStateToProps(state) {
    return { formValues: state.form.surveyForm.values };
};

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));