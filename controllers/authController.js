const express = require('express')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const authConfig = require("../config/config.json")

const User = require('../models/users')

const router = express.Router()

function generateToken (params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn : 86400
  })
}


router.post('/register', async (req, res) =>{
  try {
    const email = req.body.email
    if(await User.findOne({ email })) return res.status(400).send({error: 'User already exists'})

    const user = await User.create(req.body)

    user.password = undefined
    
    return res.send({user, token: generateToken({ id: user._id }) })
  } catch (error) {
    res.status(400).send({ error: 'Registration failed' })
  }

})

router.post('/authenticate', async (req, res) =>{
  const { email, password } = req.body

  User.validate({email, password}).catch(err=>{
    return res.status(400).send({ error: err.errors })
  })

  try {  
    const user = await User.findOne({ email })
    
    // if(!email) 
    // return res.status(400).send({ error: 'Email is required' })
    
    // if(!password) 
    // return res.status(400).send({ error: 'Password is required' })
    
    if(!user) 
    return res.status(400).send({ error: 'User not found' })
    
    if(!await bcrypt.compare(password, user.password))  
    return res.status(400).send({ error: 'Invalid password' })
    
    user.password = undefined
    
    res.send({ user, token: generateToken({ id: user._id }) })
    
  } catch (error) {
    console.log(error)    
    res.status(500).json({message: "Server Error"})
  }
})
  
  module.exports = app => app.use('/auth', router)