const Record = require('../models/records')

exports.recordList = async function(req, res) {
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
    if(page) {
      results.results = await Record.find().then(results => results.slice(startIndex, endIndex))
      return res.status(200).json(results)
    }
    
    results.results = await Record.find()
    res.status(200).json(results)
    
  } catch (error) {
    res.status(500).json({error: error})
  }
}

exports.recordCreate =  async function(req, res) {
	try {
		await Record.create(req.body)
		res.status(201).json({message: 'Ficha criada com sucesso!'})

	} catch (error) {
		//res.status(500).json({error: error.errors['name'].message})
    res.status(500).json({error: error.errors})
	}
}

exports.recordGet = async (req, res, next) =>{
  const id = req.params.id

  try {
    const record = await Record.findOne({_id: id})

    if (!record) {
      res.status(422).json({message: 'Ficha não encontrada!'})
      return
    }

    res.status(200).json(record)

  } catch (error) {
    res.status(500).json({error: error})
  }
}


exports.recordUpdate = async (req, res, next) =>{
  const id = req.params.id
  
  try {
    const updatePerson = await Record.updateOne({_id: id}, req.body)

    if(updatePerson.matchedCount === 0) {
      res.status(422).json({message: 'Ficha não encontrada!'})
      return
    }

    res.status(200).json(req.body)
  } catch (error) {
    res.status(500).json({error: error})
  }

}

exports.recordDelete =  async (req, res, next) =>{
  const id = req.params.id
  
  if (!await Record.findOne({_id: id})) {
    res.status(422).json({message: 'Ficha não encontrada!'})
    return
  }

  try {
    await Record.deleteOne({_id: id})
    res.status(200).json({message: 'Usuário removido com sucesso!'})
  } catch (error) {
    res.status(500).json({error: error})
  }
}