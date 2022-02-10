const express = require('express');
const cors = require('cors');
const db = require('./models/index.js')
const router = require('./routes.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use(router);

db.sequelize.authenticate().then(() => console.log("db connected")).catch(err => console.log('error'+ err))


const PORT = process.env.PORT || 6660

app.listen(PORT, console.log(`LISTENING on port: ${PORT}`))