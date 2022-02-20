// VALIDAÇÃO TOKEN

const jwt = require('jsonwebtoken')
const authConfig = require('../config/config.json')

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization

  if(!authHeader)
    return res.status(401).send({message: 'No token provided'})

  // Formato Bearer 465dsf4g63h54j6u5m1k5gh4j6
  const parts = authHeader.split(' ')

  if(!parts.length === 2)
    return res.status(401).send({message: 'Token error'})

  const [ scheme, token] = parts

  if(!/^Bearer$/i.test(scheme))
    res.status(401).send({message: 'Token badly formatted'})
  
  jwt.verify(token, authConfig.secret, (err, decoded) =>{
    if (err) return res.status(401).send({ error: 'Token invalid' })

    req.userId = decoded.id
    return next()
  })   
}