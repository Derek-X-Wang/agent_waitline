var express = require('express');
var router = express.Router();

router.use(function(req, res, next){
    if(req.method === "GET") {
        //open api
        return next();
    }
    if(!req.isAuthenticated()) {
        return res.redirect('/#login');
    }
    return next();
});
//api for all posts
router.route('/posts')

    //create a new post
    .post(function(req, res){

        //TODO create a new post in the database
        res.send({message:"TODO create a new post in the database"});
    })

    .get(function(req, res){

        //TODO get all the posts in the database
        res.send({message:"TODO get all the posts in the database"});
    });

//api for a specfic post
router.route('/posts/:id')

    //create
    .put(function(req,res){
        return res.send({message:'TODO modify an existing post by using param ' + req.param.id});
    })

    .get(function(req,res){
        return res.send({message:'TODO get an existing post by using param ' + req.param.id});
    })

    .delete(function(req,res){
        return res.send({message:'TODO delete an existing post by using param ' + req.param.id});
    });

module.exports = router;
