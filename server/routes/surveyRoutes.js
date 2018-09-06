const _ = require('lodash');
const Path = require('path-parser').default;
// URL is an integrated module in node.js 
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewears/requireLogin');
const requireCredits = require('../middlewears/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')
//accessing the model class in mongo
const Survey = mongoose.model('surveys');

module.exports = app => {
        // route handler to render all surveys from a logged in user. requireLogin ensures the user is logged in first
        app.get('/api/surveys', requireLogin, async (req, res) => {
            const surveys = await Survey.find({ _user: req.user.id })
                .select({ recipients: false });
            res.send(surveys);
        });

        //route for feedback response
        app.get('/api/surveys/:surveyId/:choice', (req, res)=> {
            res.send('Thank you for giving us your feedback!')
        });

        // webhook handler for sendgrid to record the user responses to surveys
        // we will look at the incoming array of events and do the processing over the url path to get survey id and the response
        app.post('/api/surveys/webhooks', (req, res) => {
            // extract the surveyId and choice after applying p to pathname
            const p = new Path('/api/surveys/:surveyId/:choice');
            
            _.chain(req.body)
                // iterate over the events array
                .map(({email, url}) => {
                    // extract the path from UR
                    const match = p.test(new URL(url).pathname);
                    if (match) {
                        return { email, surveyId: match.surveyId, choice: match.choice};
                    } 
                })
                // remove any events that are undefined (ex. if an event was other than matching parameters above). There will be only objects returned as a result, no "undefined" events
                .compact()
                // this will remove all non-unique responses from the same email to the same survey
                .uniqBy('email', 'surveyId')
                .each(({ surveyId, email, choice }) => {
                    Survey.updateOne(
                        {
                            _id: surveyId,
                            recipients: {
                                $elemMatch: { email: email, responded: false }
                        }
                    }, 
                    {
                        $inc: { [choice]: 1 },
                        $set: { 'recipients.$.responded': true },
                        lastResponded: new Date()
                    }
                ).exec();
                    // .exec() executes the query
            })
            .value();
            res.send({});
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