const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewears/requireLogin');

module.exports = app => {
    // this allows us to handle the token from stripe and to finalize the charge, then update the user's number of credits
    app.post('/api/stripe', requireLogin, async (req, res) => {
       //we are not invoking requireLogin immediately because we just need to reference it and express will execute it if necessary upon user going to this route. reqiuireLogin is a middlewear we created to check if the user is logged in. We are only using it on certain routes

        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 survey scredits',
            source: req.body.id
        }); 
        // update users' schema with 5 credits upon payment 
        req.user.credits += 5;
        //the most updated copy of the user model
        const user = await req.user.save();
        res.send(user)  
    });
};