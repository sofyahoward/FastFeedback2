const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient')

//schema for survey creation
const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    //RecipientSchema is a sub document collection. It is only nested once and is separate from users schema because MongoDB allows up to 4MB of data per document.
    recipients: [RecipientSchema],
    yes: {type: Number, default: 0},
    no: {type: Number, default: 0},
    //underscore emphasizes a relationship field, but is not required
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    dateSent: Date,
    lastResponded: Date
});

mongoose.model('surveys', surveySchema);