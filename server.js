const express = require('express');
const connectDB = require('./config/db');
const app = express();
connectDB();

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

app.listen(process.env.PORT || 5000, () => console.log('server is running'));
