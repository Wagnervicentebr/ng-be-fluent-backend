const mongoose = require('../database/index')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    sexo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    createAt: {
        type: Date,
        default: Date.now 
    }
})

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});

const User = mongoose.model('User', UserSchema)
module.exports = User