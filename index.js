const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
//There is no function that is exported from passport.js but we need the whole passport.js file.
require('./models/User');
require('./services/passport');
//mongoose connecting remotely hosted mongoDB on MLab to Node/Express server
mongoose.connect(keys.mongoURI);

const app = express();

//Valid javascript to require the function imported from another file and then to imediately invoking the app object.
require('./routes/authRoutes')(app);


// make port constant to dynamically bind based on heroku port assignment or port 5000 on local
const PORT = process.env.PORT||5000;
app.listen(PORT);



