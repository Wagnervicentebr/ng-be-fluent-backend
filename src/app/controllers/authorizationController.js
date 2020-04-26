const express = require('express')

const User = require('../models/User')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/authConfig')
const bcrypt = require('bcryptjs')

const Router = express.Router();

function generateToken(param = {}) {
    return jwt.sign(param, authConfig.secret, {
        expiresIn: 86400
    })
}

Router.post('/registre', async (req, res) => {

    try {
        const {email, username} = req.body;

        if(await User.findOne({ email }))
            return res.status(400).send({ error: 'Email ja existente na base de cadastro'})

        if(await User.findOne({ username }))
            return res.status(400).send({ error: 'Username ja existente na base de cadastro'})

        const user  = await User.create(req.body);

        user.password = undefined;
        res.send({ user, token: generateToken({username: user.username, email: user.email}) });
        
    } catch (error) {
        res.status(400).send({ error : 'Usuaio não criado, dados invalidos'})
    }
});

Router.post('/autenticate', async (req, res) => {

        try {
        
            const { username, password } = req.body;
            const user = await User.findOne({ username }).select('+password');
            
            if (!user)
            return res.status(400).send({ error: 'Username não encontrado'})
            
            if (!await bcrypt.compare(password, user.password))
            return res.status(401).send({ error: 'Senha não confere'})
            
            user.password = undefined;
            
            res.send({user, token: generateToken({username: user.username, email: user.email})})
        } catch (error) {
            res.status(400).send({ error : 'Usuaio não criado, dados invalidos'})
        }
    })
    
module.exports = app => app.use('/auth', Router)