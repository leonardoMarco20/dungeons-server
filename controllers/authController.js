const express = require('express')

const bcrypt = require('bcryptjs')
const User = require('../models/users')

const router = express.Router()

router.post('/register', async (req, res) =>{
  try {
    const email = req.body.email
    if(await User.findOne({ email })) return res.status(400).send({error: 'User already exists'})

    const user = await User.create(req.body)

    user.password = undefined
    
    return res.send({user})
  } catch (error) {
    res.status(400).send({ error: 'Registration failed' })
  }


})

module.exports = app => app.use('/auth', router)