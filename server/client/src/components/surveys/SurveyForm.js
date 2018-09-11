//SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
//reduxForm allows this component to communicate with Redux store. It is very similar in that sense to the connect function.
import { Link } from 'react-router-dom'
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
    renderFields() {
        return _.map(formFields, ({ label, name }) => {
            return <Field key={name} component={SurveyField} type='text' label={label} name={name}/>
        });
    }

    render() {
        return (
            <div>
                {/* we are not invoking the onSurveySubmit function because we want to only run it after the user submits the form, and not as soon as the js interpreter evaluated this line of code */}
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    
                    <Link to="/surveys" style={{backgroundColor:'#FA5858', position: 'absolute', height: '30px', width: '100px', marginLeft: '5%', padding: '1%', color: 'white'}}>
                        <div style={{ position: 'absolute', top:'20%', left: '25%'}}>Cancel</div>
                    </Link>

                    <button type="submit" style={{backgroundColor:'#A9F5BC', position: 'absolute', height: '30px', width: '100px', marginLeft: '86%', padding: '1%', color: '#151515'}}>
                      
                        <div style={{ position: 'absolute', top:'20%', left: '35%'}}>Next</div>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    // if the errors object is empty, the form is valid and we are good to go
    //redux form automatically matches up the field of the form with the error because the name of the field is the same
    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');
    _.each(formFields, ({name}) => {
        if(!values[name]){
            errors[name]='You must provide a value'
        }
    });

    return errors;
}

export default reduxForm({
    // validate is equal to validate: validate
    validate,
    form: 'surveyForm',
    // allows redux form to not dump the values after we navigate from the form onto the form review 
    destroyOnUnmount: false
})(SurveyForm);