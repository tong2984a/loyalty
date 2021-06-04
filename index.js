const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./queries')
const app = express()
const port = process.env.PORT || 3002

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)
app.post('/redemptions/:id', db.redeemReward)
app.post('/earnings/:id', db.earnReward)
app.post('/survey/consumers', db.createConsumerSurvey)
app.post('/survey/suppliers', db.createSupplierSurvey)
app.get('/ads', db.getSupplierSurveyById)
// Start server
app.listen(port, () => {
  console.log(`Server listening`)
})
