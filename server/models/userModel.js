const { maxLength } = require('cookieparser');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    pseudo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false,
        minLength: [8, 'Le mot de passe doit contenir au moins 8 caractères']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    pokemons: {
        type: Array,
        default: []
    },
    level: {
        type: Number,
        default: 1
    },
    pieces: {
        type: Number,
        default: 100
    },
    xp: {
        type: Number,
        default: 0
    },
    sets: {
        type: Array,
        maxLength: 3,
        default: ["swsh1", "dp1", "hgss1"]
    }
});

const User = mongoose.model('users', userSchema);

module.exports = User;