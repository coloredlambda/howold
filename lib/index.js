require('dotenv').config();
const express = require('express')
const { or } = require("@meltwater/phi");

// Middlewares
const rateLimit = require('./middlewares/rate-limit')

// Utils
const createGetAge = require('./util/get-age')

const PORT = or(process.env.PORT, 8080)

const app = express()

app.get('/howold', rateLimit, (req, res) => {
    const { dob } = req.query
    console.log("The dob", dob)
    const getAge = createGetAge(new Date())
    const age = getAge(new Date(dob))
    return res.status(200).json(age)
})

app.listen(PORT, () => {
    console.log('Server started on', PORT)
})

