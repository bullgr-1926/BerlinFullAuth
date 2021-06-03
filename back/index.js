const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const models = require('./models')
const loginRoute = require('./routes/loginRoute')
const port = 3002


app.use(cors())


app.use('/', loginRoute)

models.sequelize.sync().then(app.listen(port, console.log(`Server is running on port ${port}`)))