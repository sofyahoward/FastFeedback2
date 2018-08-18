const mongoose = require('mongoose');
const requireLogin = require('../middlewears/requireLogin');
const requireCredits = require('../middlewears/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')
//accessing the model class in mongo
const Survey = mongoose.model('surveys');

module.exports = app => {
        //route for feedback response
        app.get('/api/surveys/thanks', (req, res)=> {
            res.send('Thank you for giving us your feedback!')
        });

        //route handler to create a new survey
        app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        //getting access to various properties inside request body
        const {title, subject, body, recipients} = req.body;

        const survey = new Survey({
            //es6 syntax equivalent to title: title
            title,
            subject,
            body,
            //split the string of emails by the comma, then map through the created array of strings and return an array of objects and remove any white spaces
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            //allows us to identify the owner of the survey
            _user: req.user.id,
            dateSent: Date.now(),
        });
        //Great place to send an email

        //async operations to send the mailer, 
        //then save the survey after the mailer is successfully sent
        //then deduct one credit from user
        //then save the user model and use the new/updated 'user' model
        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();

            res.send(user);
        } catch (err){
            //422-unprocessable entity. Something is not right with the data you sent us
            res.status(422).send(err)
        }    
    });
};