if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const express = require("express");
const mongoose = require('mongoose');
const app = express();

//cors config
const cors = require('cors');
app.use(cors());
app.options('*', cors())

//body parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())

//Rotas API
const recordRoutes = require('./routes/recordRoutes')
const userRoutes = require('./routes/userRoutes')
const loginRoutes = require('./routes/loginRoutes')

app.use('/record', recordRoutes)
app.use('/user', userRoutes)
app.use('/login', loginRoutes)

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