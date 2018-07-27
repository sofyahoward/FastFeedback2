const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
//you are able to pull out a Schema from mongoose by giving a single argument. refer to User.js. One argument means we are fetching data from mongoose. Two arguments means we are loading data into mongoose.
const User = mongoose.model('users');
//serializeUser tells passport to get the user and takes the id from mongoDB to identify the user and put that infromation into a cookie at a later point.
passport.serializeUser((user, done)=> {
    done(null, user.id);
});
//pull out identifying information about a user for the future from a cookie.
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        //URL that the user is redirected to upon granting permission for authentication
        callbackURL: '/auth/google/callback',
        //this is one solution to resolve hppts issue with google auth. This allows us to trust the Heroku's proxy and redirect to Google Auth. The second solution is to spell out callbackURI in the config files for droduction/development
        proxy: true
    },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({googleId: profile.id}).then   (existingUser => {
                if(existingUser){
                    // we already have a record with the given profile ID
                    done(null, existingUser);
                } else{
                    //upon authentication create new user object in mongoose with google ID. This doesnt persist to the mongoDB. you MUST use .save() method to have it go to the mongoDB
                    new User({ googleId: profile.id}).save().then(user => done(null, user));
                }
            });
        
        //information about the user to be added to the database
    console.log("access token", accessToken);
    console.log("refresh token ", refreshToken);
    console.log("profile:", profile);
    }
    )
);