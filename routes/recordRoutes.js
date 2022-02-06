const router = require('express').Router()
const express = require("express");
const app = express()
const Record = require('../models/records')

/*const corsOptions = {
  "origin": "*",
  "headers": "*",
  "methods": ['POST','GET','HEAD','PUT','PATCH','DELETE'],
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}*/


//READ ALL
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
    results.results = await Record.find().then(results => results.slice(startIndex, endIndex))
    console.log(results)
    res.status(200).json(results)

  } catch (error) {
    res.status(500).json({error: error})
  }
})

//CREATE ONE
router.post('/', async (req, res) => {
	try {
		await Record.create(req.body)
		res.status(201).json({message: 'Ficha criada com sucesso!'})

	} catch (error) {
		//res.status(500).json({error: error.errors['name'].message})
    res.status(500).json({error: error.errors})
	}
})

//READ ONE
router.get('/:id', async (req, res, next) =>{
  const id = req.params.id

  try {
    const record = await Record.findOne({_id: id})

    if (!record) {
      res.status(422).json({message: 'Usuário não encontrado!'})
      return
    }

    res.status(200).json(record)

  } catch (error) {
    res.status(500).json({error: error})
  }
})

//UPDATE
router.put('/:id', (req, res, next) =>{
  
});

router.patch('/:id', async (req, res, next) =>{
  const id = req.params.id
  
  try {
    const updatePerson = await Record.updateOne({_id: id}, req.body)

    if(updatePerson.matchedCount === 0) {
      res.status(422).json({message: 'Usuário não encontrado!'})
      return
    }

    res.status(200).json(req.body)
  } catch (error) {
    res.status(500).json({error: error})
  }

});

//DELETE
router.delete('/:id', async (req, res, next) =>{
  const id = req.params.id
  
  if (!await Record.findOne({_id: id})) {
    res.status(422).json({message: 'Usuário não encontrado!'})
    return
  }

  try {
    await Record.deleteOne({_id: id})
    res.status(200).json({message: 'Usuário removido com sucesso!'})
  } catch (error) {
    res.status(500).json({error: error})
  }
});


module.exports = router