var express = require('express');
var router = express.Router();

// router.route('/signup')
//     .post(function(req, res){
//       console.log("here");
//     });

    // router.post('/signup', function(req, res){
    //       console.log("here");
    //       console.log("req", req);
    //       console.log("res", res);
    //     });

// router.route('/signup')
//     .post(function(req, res){
//
//     });
// router.route('/signup')
//     .post(function(req, res){
//
//     });
// router.route('/signup')
//     .post(function(req, res){
//
//     });

// module.exports = router;

module.exports = function(passport){

    //sends successful login state back to angular
    router.get('/success', function(req, res){
        res.send({state: 'success', user: req.user ? req.user : null});
    });

    //sends failure login state back to angular
    router.get('/failure', function(req, res){
        res.send({state: 'failure', user: null, message: "Invalid username or password"});
    });

    //log in
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure',
    }));

    //sign up
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure',
    }));

    //log out
    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    return router;

};
