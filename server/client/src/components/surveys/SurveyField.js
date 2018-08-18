// SurveyField contains logic to render a single label and text input

import React from 'react';

//ES6 destructuring ({input}) is props.input
export default ({ input, label }) => {
    return (
        <div>
            <label>{label}</label>
            {/* this allows us to use all properties on input */}
            <input {...input} />
        </div>
    )
}