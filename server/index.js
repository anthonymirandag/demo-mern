require('./config/config')
const express = require('express')
const bodyParser = require('express') 
const morgan =  require('morgan')
const app = express()
const routes = require('./routes')
const cors = require('cors')

app.use(morgan('tiny'))

app.use(cors({ origin: 'http://localhost:3000'}))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(routes)

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/demo',{ useNewUrlParser:true },(err)=>{
    if(err)
        console.log(err)
    else
        console.log('Mongo connect success')
})


const PORT = process.env.PORT || 3002

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT} `)
})

