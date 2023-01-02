require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors')
const { body, validationResult } = require('express-validator');

const app = express();
app.use(cors())
app.use(express.static("public"));
app.set('view engine', 'ejs');
main().catch(err => console.log(err));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function main(){

    await mongoose.connect(process.env.MONGOOSE_KEY, { useNewUrlParser: true, useUnifiedTopology: true});
}

app.use('/api/auth', require ('./routes/auth.js'));
app.use('/api/note', require('./routes/note.js'))


app.listen(3001, () => console.log("\nServer Connected at port 3001\n"))
