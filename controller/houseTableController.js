const db = require('../models')

//main model
const HouseTable = db.houseTables;

// add HouseTable
const addHouseTable = async (req, res) => {
    //Valiadate the incoming srequest.
    let isValid = validateRequest(req)
    if (!isValid) {
        res.status(400).json({ success: false, "errorMessage ": "Address , Current Value , Loan Amount are required details. Current value should be greater than 0.  Please check if all the details are filled" });
    } else {

        let calculatedRisk = evaluateRisk(req.body.loanAmount, req.body.currentValue)
        let request = {
            address: req.body.address,
            currentValue: req.body.currentValue,
            loanAmount: req.body.loanAmount,
            risk: calculatedRisk
        }

        const requestBody = await HouseTable.create(request)
        res.status(200).send(requestBody)
    }
}

//get all house records
const getAllHouseTable = async (req, res) => {
    let house = await HouseTable.findAll({
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
const updateHouseTable = async (req, res) => {
    let id = req.params.id
    let calculatedRisk = evaluateRisk(req.body.loanAmount, req.body.currentValue)
    let isValid = validateRequest(req)
    if (!isValid) {
        res.status(400).json({ success: false, "errorMessage ": "Address , Current Value , Loan Amount are required details. Current value should be greater than 0.  Please check if all the details are ffilled" });
    } else {
        let request = {
            address: req.body.address,
            currentValue: req.body.currentValue,
            loanAmount: req.body.loanAmount,
            risk: calculatedRisk
        }
        let house = await HouseTable.update(request, { where: { id: id } })
        res.status(200).send(house)
    }
}

//get house record for a particualr id 
const getHouseTable = async (req, res) => {
    let id = req.params.id
    let house = await HouseTable.findOne({ where: { id: id } })
    res.status(200).send(house)
}

const evaluateRisk = (loanAmount, currentValue) => {
    // Algorithm implementation
    //Calculate Risk = Loan Amount / Current Value
    let calculatedRisk = loanAmount / currentValue;
    //If the `loanAmount` is more than 50% of the `currentValue`, increase the risk by an additional 10% 
    if (loanAmount > currentValue / 2) {
        calculatedRisk = (0.1 * calculatedRisk) + calculatedRisk;
        // Condition is to validate the request when current Value and Loan amount are nearly equal
        if(calculatedRisk > 1) {
            calculatedRisk = 1
        }
    }
    return calculatedRisk;
}
const validateRequest = (req) => {
    // Validate the incoming request . 
    // current value cannot be 0
    if (req.body.address === undefined || req.body.loanAmount === undefined || req.body.currentValue === undefined) {
        return false;
    } else {
        let loanAmount = parseFloat(req.body.loanAmount);
        let currentValue = parseFloat(req.body.currentValue);
        if (currentValue <= 0 || loanAmount < 0 || loanAmount > currentValue) {
            return false;
        }
    }

    return true;
}

module.exports = {
    addHouseTable,
    getAllHouseTable,
    updateHouseTable,
    getHouseTable,
    evaluateRisk
}