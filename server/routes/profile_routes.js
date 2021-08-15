
var express = require('express')
var router = express.Router()


const profile_control = require('../controllers/profile_controller')
    
// Create 
//app.post('/profile', profile_control.create)  not needed created when user  sign in

// Retrieve all
router.get('/all_profiles', profile_control.findAll)

// Retrieve a single  with Id
router.get('/profile/:profileId', profile_control.findOne)

// Update  with Id
router.put('/profile/:profileId', profile_control.update)

// Delete  with Id
router.delete('/profile/:profileId', profile_control.delete)
    

module.exports = router