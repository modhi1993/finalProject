const express = require('express');
//import router into express
const router = express.Router();
//import car model
const User = require('../models/user');
const customErrors = require('../../lib/custom_errors')
// we'll use this function to send 404 when non-existant document is requested
// const requireOwnership = customErrors.requireOwnership
// const requireApproval = customErrors.requireApproval
// import passport
const passport = require('passport');
const requireToken = passport.authenticate('bearer',{session:false})

//get all users
router.get('/users',requireToken,(req,res,next) => {
    User.find()
    .then(users => {
        res.status(200).json({users:users});
    })
    .catch(next)
})

//SHOW 
// router.get('/users/:id',requireToken,(req,res,next) => {
//     const userId = req.params.id;
//     User.findById(userId)
//     .then(user =>{
//         res.status(200).json({user:user})
//     })
//     .catch(next)
// })

//UPDATE Approvel
// router.patch('/users/:id',requireToken,(req,res,next) => {
//     const userId = req.params.id;
//     const approval = req.body.isApproved
//     User.findById(userId)
//     .then((user) => {
//         user.isApproved = approval
//         return user.save()
//     })
//     .then(()=> res.sendStatus(204))
//     .catch(next)
// })

//delete - decline request
router.delete('/users/:id',requireToken,(req,res,next) => {
    const userId = req.params.id;
    User.findById(userId)
    .then((user) => {
        return user.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router;