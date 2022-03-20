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

router.patch('/register/:id', async (req, res) => {
  try {
    var {email, password} = req.body
    const id = req.params.id
    
    if(password) {
      const hash = await bcrypt.hash(password, 10)
      password = hash
      req.body.password = hash
      console.log('caiu no password')
    }

    var validateEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
    if(!email && !email.match(validateEmail)) 
      return res.status(400).send({ error: 'Invalid email' })
        
    const user = await User.updateOne({_id: id}, req.body)

    if(user.matchedCount === 0) {
      res.status(422).json({message: 'Ficha não encontrada!'})
      return
    }

    user.password = undefined

    res.status(200).json(req.body)    
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

    
    res.send({ user, token: generateToken({ id: user._id }) })
  })
  .catch(err=>{
    res.status(402).send({ error: err.errors })
  })
})
  
  module.exports = app => app.use('/auth', router)