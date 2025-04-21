const mongoose = require('mongoose');

const db_uri = process.env.DB_URI;
console.log('Db uri - ', db_uri);

mongoose.connect(db_uri)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
