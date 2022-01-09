const router = require('express').Router()

const Record = require('../models/records')

//READ ALL

router.get('/', async (req, res) =>{
  try {
    const record = await Record.find()
    res.status(200).json(record)

  } catch (error) {
    res.status(500).json({error: error})
  }
})


//CREATE ONE
router.post('/', async (req, res) => {
	const {name, surname} = req.body
	
  //Não precisa fazer isso é só passar o req.body direto
	const record = {
		name,
		surname
	}

	if(!name) {
		res.status(422).json({message:'Nome é obrigatório!'})
    return
	}

	try {
		await Record.create(record)
		res.status(201).json({message: 'Ficha criada com sucesso!'})

	} catch (error) {
		res.status(500).json({error: error})
	}
})

module.exports = router


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
  const {name, surname} = req.body

  //Não precisa fazer isso é só passar o req.body direto
  const record = {
    name, 
    surname
  }

  try {
    const updatePerson = await Record.updateOne({_id: id}, record)

    if(updatePerson.matchedCount === 0) {
      res.status(422).json({message: 'Usuário não encontrado!'})
      return
    }

    res.status(200).json(record)
  } catch (error) {
    res.status(500).json({error: error})
  }

});


//DELETE
router.delete('/:id', async (req, res, next) =>{
  const id = req.params.id

  const record = await Record.findOne({_id: id})
  
  if (!record) {
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
