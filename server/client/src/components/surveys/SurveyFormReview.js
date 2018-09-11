// SurveyFormReview shows users their form inputs for review
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import {withRouter} from 'react-router-dom';
import * as actions from '../../actions/index';

//destructuring. Instead of receiving all props, we just want to use onCancel and formValues that we have assigned values down below in mapStateToProps
const SurveyFormReview = ({onCancel, formValues, submitSurvey, history}) => {

    const reviewFields = _.map(formFields, field => {
        return (
            <div style={{marginBottom: '2%', marginTop: '2%', marginLeft: '5%'}} key={field.name}>
                <label>{field.label}</label>
                <div>
                    {formValues[field.name]}
                </div>
            </div>
        )
    })

    return (
        <div>
            <h5 style={{textAlign: 'center', marginTop: '5%'}}>Please confirm your entries</h5>
            {reviewFields}
            
            <button style={{backgroundColor:'#FA5858', position: 'absolute', height: '30px', width: '100px', marginLeft: '5%', padding: '1%', color: 'white'}} onClick={onCancel}>
                <div style={{ position: 'absolute', top:'20%', left: '25%'}}>Back</div>
            </button>

            <button 
            // arrow function makes sure the function is not immediately executed
                onClick={() => submitSurvey(formValues, history)}
                style={{backgroundColor:'#A9F5BC', position: 'absolute', height: '30px', width: '150px', marginLeft: '80%', padding: '1%', color: '#151515'}}>
                      
                      <div style={{ position: 'absolute', top:'20%', left: '30%'}}>Send Survey</div>
               
                        <i style={{ position: 'absolute', top:'20%', left: '2%'}} className="material-icons right">email</i>
            </button>
        </div>
    );
};

//formValues is being passed as props to SurveyFormReview
function mapStateToProps(state) {
    return { formValues: state.form.surveyForm.values };
};

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));