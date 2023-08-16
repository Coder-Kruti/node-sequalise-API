const express = require('express')
const cors = require('cors')
const { json } = require('express/lib/response')

const app = express()

var corsOption = {
    origin: 'https://localhost:8081'
}

// middle ware
app.use(cors(corsOption))
// app.use(express(json)) // Our API will accept and return data in JSON.
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/', (req,res) => {
    res.json({message: 'hi'}) 
})

//routers
const router = require('./routes/houseTableRoute.js')
app.use('/api', router)

const PORT = process.env.PORT || 8080 // use the port from environment variable, If not available then use 8080 

//server 
app.listen(PORT, ()=> {
    console.log("Server is running ")
})