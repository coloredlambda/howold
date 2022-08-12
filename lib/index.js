require('dotenv').config()
const express = require('express')
const { or, isFalse } = require('@meltwater/phi')

// Middlewares
const rateLimit = require('./middlewares/rate-limit')

// Utils
const createGetAge = require('./util/get-age')
const validateDob = require('./util/validate-dob')

const PORT = or(process.env.PORT, 8080)

const app = express()

app.use(rateLimit)

app.get('/howold', (req, res) => {
  const { dob } = req.query
  const validatedDob = validateDob(dob)

  if (isFalse(validatedDob)) {
    return res.status(400).json('Bad Request')
  }

  const getAge = createGetAge(new Date().getTime())
  const age = getAge(new Date(validatedDob))
  return res.status(200).json({ age })
})

app.listen(PORT, () => {
  console.log('Server started on', PORT)
})
