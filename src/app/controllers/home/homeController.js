const express = require('express') 
const Router = express.Router();


module.exports = {
    
    async listDeck(req, res) {
        
        res.json({ok: true})
    } 
}