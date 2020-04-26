const jwt = require('jsonwebtoken')
const authConfig = require('../config/authConfig')


module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({ error: "Token not found"})

    const parts = authHeader.split(' ');

    if (!parts.length == 2)
        return res.status(401).send({ error: "Token error"})

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) 
        return res.status(401).send({ error: "Token malformated"})

    jwt.verify(token, authConfig.secret, (error, decoded) => {
        if (error)
            return res.status(401).send({ error: 'Token invalid'})
        
        req.userId = decoded.id
        req.userName = decoded.username

        return next();
    })

    
}