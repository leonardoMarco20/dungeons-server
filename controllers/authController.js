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

  User.validate({email, password})
  .then(async () => {
    const user = await User.findOne({ email })

    if(!user) {
      return res.status(400).send({ error: 'Usuário não encontrado' })
    } 
    
    if(!await bcrypt.compare(password, user.password)) {
      return res.status(400).send({ error: 'Senha inválida' })
    }  

    user.password = undefined
    
    res.send({ user, token: generateToken({ id: user._id }) })
  })
  .catch(err=>{
    res.status(402).send({ error: err.errors })
  })
})
  
  module.exports = app => app.use('/auth', router)