const express = require('express');
const adminRouter = require('./routes/adminRouter');

require('dotenv').config();
require('./config/connectDB');

const app = express();
const port = process.env.PORT || 3003;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', adminRouter);

app.listen(port,
    () => console.log(`http://localhost:${port}`)
);