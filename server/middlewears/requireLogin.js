//function to make sure the user is logged in 
//this will only be used on certain routes
module.exports = (req, res, next) => {
    //end the request early if the user is not logged in
    if (!req.user){
        return res.status(401).send({error: 'You must log in!'})
    }
    //go to next middleware or route handler if the user is logged in
    next();
};