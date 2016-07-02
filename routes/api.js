var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');

router.route('/users')
    .get(function(req, res){
      console.log("getting users");
        User.find({ available: true }, function(err, users){
            if(err){
                return res.send(500, err);
            }
            return res.send(users);
        });
    });

router.route('/users')
    .get(function(req, res){
      console.log("getting users");
        User.find({ available: true }, function(err, users){
            if(err){
                return res.send(500, err);
            }
            return res.send(users);
        });
    });

router.use(isAuthenticated);
//api for all posts
router.route('/users/:email')
    .post(function(req, res){
        User.findOneAndUpdate({ 'email':  req.body.email }, { 'available': req.body.available },function(err, user){
          if(err){
              return res.send(500, err);
          }
          return res.send("succesfully saved");
        });
    })
    .put(function(req, res){
        // TODO implement update
        console.log("req--:",req.body);
    });

//Used for routes that must be authenticated.
function isAuthenticated (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects

    //allow all get request methods
    if(req.method === "GET"){
        return next();
    }
    if (req.isAuthenticated()){
        return next();
    }

    // if the user is not authenticated then redirect him to the login page
    return res.redirect('/#login');
}

module.exports = router;
