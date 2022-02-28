const router = require('express').Router()
var recordController = require('../controllers/recordController')

//LIST PAGINATION
router.get('/', recordController.recordList)

//CREATE ONE
router.post('/', recordController.recordCreate)

//READ ONE
router.get('/:id', recordController.recordGet)

//UPDATE
router.patch('/:id', recordController.recordUpdate);

//DELETE
router.delete('/:id', recordController.recordDelete);

module.exports = router