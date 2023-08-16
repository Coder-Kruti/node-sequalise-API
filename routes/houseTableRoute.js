const houseTableController = require('../controller/houseTableController.js')

const router = require('express').Router()
router.post('/houses', houseTableController.addHouseTable)

router.get('/houses', houseTableController.getAllHouseTable)

router.get('/houses/:id', houseTableController.getHouseTable)

router.put('/houses/:id', houseTableController.updateHouseTable)

module.exports = router
