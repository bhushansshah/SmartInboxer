const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRouter = require('./routes/authRoutes');
require('./models/dbConnection');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
