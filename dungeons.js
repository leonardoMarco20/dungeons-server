const express = require("express");
const mongoose = require('mongoose');
const app = express()

const cors = require('cors');
app.use(cors());
app.options('*', cors())

const bodyParser = require('body-parser')
app.use(bodyParser.json())

//Rotas API
const recordRoutes = require('./routes/recordRoutes')

app.use('/record', recordRoutes)

const uri = "mongodb+srv://leo:2006@dungeonscluster.qpzc1.mongodb.net/dungeons?retryWrites=true&w=majority"

const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
	res.send('Leo XD')
})

mongoose.connect(uri)
	.then(() =>{
		app.listen(port)
		console.log('The orcs army is approaching in the gate', port)
	})
	.catch(err => console.log(err))