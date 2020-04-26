const express = require('express')
const app = express()
const router = require('./src/routes')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors());
app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json())
require('./src/app/controllers/authorizationController')(app)

app.use('/api', router)



app.listen(3000, () => {
    console.log('running on port 3000')
});