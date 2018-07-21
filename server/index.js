const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
//There is no function that is exported from passport.js but we need the whole passport.js file.
require('./models/User');
require('./services/passport');
//mongoose connecting remotely hosted mongoDB on MLab to Node/Express server
mongoose.connect(keys.mongoURI);

const app = express();

//telling app to use cookies for sessions.
app.use(
  cookieSession({
    //how long this cookie can live in the browser before it expires. In this case, 30 days.
    maxAge: 30*24*60*60*1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use('./routes/authRoutes')(app);

//Valid javascript to require the function imported from another file and then to imediately invoking the app object.
require('./routes/authRoutes')(app);


// make port constant to dynamically bind based on heroku port assignment or port 5000 on local
const PORT = process.env.PORT||5000;
app.listen(PORT);



