const express = require("express");
const router = require('express').Router()
const User = require('../models/users')

const { checkAuthenticated } = require('../controllers/auth.js')

router.get('/', async (req, res) =>{
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)

  const startIndex = (page - 1) * limit
  const endIndex = page * limit 

  const results = {}

  results.page = page
  results.limit = limit

  results.next = {
    page: page + 1,
    limit: limit
  }

  results.previous = {
    page: page + 1,
    limit: limit
  }
  
  try {
    results.results = await User.find().then(results => results.slice(startIndex, endIndex))
    res.status(200).json(results)

  } catch (error) {
    res.status(500).json({error: error})
  }
})

router.post('/', checkAuthenticated, async (req, res) => {
  console.log(req.body)
	try {
		await User.create(req.body)
		res.status(201).json({message: 'Usuário criado com sucesso!'})

	} catch (error) {
    res.status(500).json({error: error.errors})
	}
})

/*
router.get('/:id', async (req, res, next) =>{
  const id = req.params.id

  try {
    const User = await User.findOne({_id: id})

    if (!User) {
      res.status(422).json({message: 'Usuário não encontrado!'})
      return
    }

    res.status(200).json(User)

  } catch (error) {
    res.status(500).json({error: error})
  }
});

router.patch('/:id', async (req, res, next) =>{
  const id = req.params.id
  
  try {
    const updatePerson = await User.updateOne({_id: id}, req.body)

    if(updatePerson.matchedCount === 0) {
      res.status(422).json({message: 'Usuário não encontrado!'})
      return
    }

    res.status(200).json(req.body)
  } catch (error) {
    res.status(500).json({error: error})
  }

});
*/

router.delete('/:id', async (req, res, next) =>{
  const id = req.params.id
  
  if (!await User.findOne({_id: id})) {
    res.status(422).json({message: 'Usuário não encontrado!'})
    return
  }

  try {
    await User.deleteOne({_id: id})
    res.status(200).json({message: 'Usuário removido com sucesso!'})
  } catch (error) {
    res.status(500).json({error: error})
  }
});


module.exports = router