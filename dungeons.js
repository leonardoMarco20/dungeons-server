const express = require("express");
const mongoose = require('mongoose');
const app = express()


const { MongoClient } = require('mongodb');

app.use(express.json())

//Rotas API
const recordRoutes = require('./routes/recordRoutes')

app.use('/record', recordRoutes)

const uri = "mongodb+srv://leo:2006@cluster0.qpzc1.mongodb.net/dungeons?retryWrites=true&w=majority"


app.get('/', (req, res) => {
	res.send('Leo XD')
})

mongoose.connect(uri)
	.then(() =>{
		app.listen(3000)
	})
	.catch(err => console.log(err))