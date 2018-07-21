const passport = require('passport');
//we call this function with the express app object. Thats why we add app as an arguement to the function
module.exports = app => {
    // this code is telling the express application to handle a get request that comes in from auth/google by using googleStrategy authentication. Scope refers to what information we want to get about the user from google. 
    app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    //googleStrategy has the code this time around and it knows to use passport to get user profile instead of authenticating the user. the user has the code from google this time.
    app.get('/auth/google/callback', passport.authenticate('google'));
    //route handler that allows user to logout. kills the cookie and sends the response to show that user is undefined due to logout.
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });
    //this is a route handler for current user.
    app.get('/api/current_user', (req, res)=>{
        res.send(req.user);
    });
};