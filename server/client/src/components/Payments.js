import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';
import * as actions from '../actions';
import classes from './Header.css';

//stripe payment component. renders a button that brings up a payment form upon a click
class Payments extends Component {
    render() {
        return (
            <StripeCheckout 
                name = "Fast Feedback"
                description = "$5 for 5 survey credits"
                amount={500}
                token={token => this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
            {/* this allows us to customize the look of the button */}
            <button className={classes.Payment}>
                Add credits
            </button>
            </StripeCheckout> 
        );
    }
}

export default connect(null, actions) (Payments);

