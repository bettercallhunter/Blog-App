const mongoose = require('mongoose');
const crypto = require('crypto');
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, min: 4, unique: true },
    password: { type: String, required: true },
    salt: String

});

UserSchema.methods.setPassword = function (password) {

    // Creating a unique salt for a particular user 
    this.salt = crypto.randomBytes(16).toString('hex');

    // Hashing user's salt and password with 1000 iterations, 

    const hash = crypto.pbkdf2Sync(password, this.salt,
        1000, 64, 'sha512').toString('hex');
    this.password = hash;
};
UserSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password,
        this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.password === hash;
};
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;


// const mongoose = require('mongoose');
// const { Schema, model } = mongoose;

// const UserSchema = new mongoose.Schema({
//     username: { type: String, required: true, min: 4, unique: true },
//     password: { type: String, required: true },
// });

// const UserModel = model('User', UserSchema);

// module.exports = UserModel;