const mongoose = require('mongoose');

const Userschema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
    },
}, { timestamps: true });

const UserModel = mongoose.model('social-logins', Userschema);

module.exports = UserModel;