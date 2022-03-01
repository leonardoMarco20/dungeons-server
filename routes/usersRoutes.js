const router = require('express').Router()

const User = require('../models/users')

router.get('/:id', async function(req, res) {
  const id = req.params.id

  try {
    const record = await User.findOne({_id: id})

    if (!record) {
      res.status(422).json({message: 'Usuário não encontrado!'})
      return
    }

    res.status(200).json(record)

  } catch (error) {
    res.status(500).json({error: error})
  }
})

module.exports = router