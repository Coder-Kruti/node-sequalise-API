const db = require('../models')

//main model
const HouseTable = db.houseTables;

// add HouseTable
const addHouseTable = async (req, res) => {
    let request = {
        // id : req.body.id,
        address : req.body.address,
        currentValue : req.body.currentValue,
        loanAmount : req.body.loanAmount 
    }

    const requestBody = await HouseTable.create(request)
    res.status(200).send(requestBody)
    console.log(requestBody)
}

//get all house records
const getAllHouseTable = async (req, res) =>{
    let house= await HouseTable.findAll({
        attributes: [
            'id',
            'address',
            'currentValue',
            'loanAmount',
            'risk'
        ]
    })
    res.status(200).send(house)
}
 
//update house record for a particualr id 
const updateHouseTable = async (req, res) =>{
    let id = req.params.id
    let house = await HouseTable.update(req.body, {where : {id:id}})
    res.status(200).send(house)
}

//get house record for a particualr id 
const getHouseTable = async (req, res) =>{
    let id = req.params.id
    let house = await HouseTable.findOne({where : {id:id}})
    res.status(200).send(house)
}

module.exports={
    addHouseTable,
    getAllHouseTable,
    updateHouseTable,
    getHouseTable
}