// SurveyField contains logic to render a single label and text input

import React from 'react';

//ES6 destructuring ({input}) is props.input
export default ({ input, label, meta: {error, touched} }) => {
    return (
        <div>
            <label>{label}</label>
            {/* this allows us to use all properties on input */}
            <input {...input} style={{marginBottom: '5px'}}/>
            {/* if touched is true and error is true, render error, otherwise exit this statement */}
            <div className='red-text' style={{marginBottom: '20px'}}>
             {touched && error}
            </div>
        </div>
    )
}