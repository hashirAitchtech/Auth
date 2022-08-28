const dotenv = require('dotenv');

dotenv.config({path: './config.env'});

const mongoose = require('mongoose');

const app = require('./app');

const port = process.env.PORT;

const DB = process.env.DATABASE_LOCAL;

// For connecting to database
mongoose.connect(DB, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => {
	console.log("DB connection successful");
})

app.listen(port, function(){
    console.log('server running on localhost: ' + port);
})