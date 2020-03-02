const express = require('express');
const connectDB = require('./config/db');
const app = express();
connectDB();
app.listen(process.env.PORT || 5500, () => console.log('server is running'));
