require('dotenv').config();
const express = require("express");
const port = process.env.PORT || 3000;
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require('./routes');
app.use(routes);

app.listen(port, () => {
    console.log(`App is listening to port ${port}`);
});