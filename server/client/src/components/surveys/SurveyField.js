// SurveyField contains logic to render a single label and text input

import React from 'react';

//ES6 destructuring ({input}) is props.input
export default ({ input, label, meta: {error, touched} }) => {
    return (
        <div style={{marginTop: '3%'}}>  
            <label style={{color: '#151515', marginLeft: '5%', fontSize: '14px'}}>{label}</label>
            {/* this allows us to use all properties on input */}
            <input {...input} style={{marginRight: '2%', marginLeft: '5%', marginBottom: '5px', width: '90%'}}/>
            {/* if touched is true and error is true, render error, otherwise exit this statement */}
            <div style={{color:'red', marginLeft: '5%', marginBottom: '20px'}}>
             {touched && error}
            </div>
        </div>
    )
}