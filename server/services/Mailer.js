const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

//es2015 syntax allowing our class mailer to inherit properties from a built-in Mail object provided by sendgrid
class Mailer extends helper.Mail {
    //recipients comes from the survey instance=>recipients subdocument collection. It is an array of objects, with each object having an email key/value pair.
    constructor({subject, recipients}, content){
        super();

        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email('no-reply@fastfeedback.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        //this actually registers the content for the mailer. addContent is a built in sendgrid function.
        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();
    }
    //here we are using destructuring to pull off the email value from each of the recipients' objects and returning that email. Because of this function, this.recipients is an array of helper.Email objects that work for sendgrid to send emails to.
    formatAddresses(recipients){
        return recipients.map(({email}) => {
            return new helper.Email(email);
        });
    }
    addClickTracking(){
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
        const personalize = new helper.Personalization();

        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }
    //send the mailer to sendgrid
    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });
        const response = await this.sgApi.API(request);
        return response;
    }
};

module.exports = Mailer;