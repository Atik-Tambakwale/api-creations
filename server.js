const express = require("express");
const { connect } = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { PORT, MONGODB_URL } = require("./Config");

const app = express();

//=======middleware block===========//
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//load Routes//
app.use('/api/posts', require("./Routes/posts"));

//==========DATABASE CONNECTIONS ======//
let startApp = async () => {
	try {
		await connect(MONGODB_URL, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true }, (err) => {
			if (err) throw err;
			console.log("DATABASE CONNECTED");

		});
		app.listen(PORT, (err) => {
			if (err) throw err;
			console.log("SERVER LISTENING ON PORT " + PORT);
		})
	} catch (error) {
		console.log(error);
	}
}
startApp();