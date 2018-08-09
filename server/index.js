const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
//There is no function that is exported from passport.js but we need the whole passport.js file.
require('./models/User');
require('./services/passport');
//mongoose connecting remotely hosted mongoDB on MLab to Node/Express server
mongoose.connect(keys.mongoURI);

const app = express();

//tell express to use body parser middlewear. rec.body property will be assigned and then the information within the json object could be accessed anywhere in the app.
app.use(bodyParser.json());

//tell app to use cookies for sessions.
app.use(
  cookieSession({
    //how long this cookie can live in the browser before it expires. In this case, 30 days.
    maxAge: 30*24*60*60*1000,
    keys: [keys.cookieKey]
  })
);
//tell passport to use cookies to manage authentication and sessions
app.use(passport.initialize());
app.use(passport.session());

//Valid javascript to require the function imported from another file and then to imediately invoking the app object.
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if(process.env.NODE_ENV ==='production'){
  //express will serve up production assets
  //like our main.js file, or main.css file 
  //very particular file path
  //this tells express server to look for a specific file inside its directory if we don't have a route handler for a requested route
  app.use(express.static('client/build'))

  //Express will serve up the index.html file if it doesnt recognize the route after trying to match up the route above.
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });

}

// make port constant to dynamically bind based on heroku port assignment or port 5000 on local
const PORT = process.env.PORT||5000;
app.listen(PORT);



