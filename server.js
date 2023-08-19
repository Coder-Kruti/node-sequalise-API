const express = require('express')
const cors = require('cors')
const { json } = require('express/lib/response')

const app = express()


const corsOrigin ={
    origin:'http://localhost:3000', //from the port where front end is using
    credentials:true,            
    optionSuccessStatus:200
}
// middle ware
app.use(cors(corsOrigin))
// app.use(express(json)) // Our API will accept and return data in JSON.
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/', (req,res) => {
    res.json({message: 'Server is up and running.'})
})

//routers
const router = require('./routes/houseTableRoute.js')
app.use('/api', router)

const PORT = process.env.PORT || 8080 // use the port from environment variable, If not available then use 8080 

//server 
app.listen(PORT, ()=> {
    console.log("Server is running ")
})