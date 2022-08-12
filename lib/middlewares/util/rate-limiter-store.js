const { assoc, propOr, sum, gte } = require('@meltwater/phi')

let rates = { }

const clearRates = () => {
  rates = {}
}

setInterval(clearRates, 5000)

const RATE_LIMIT_EXCEEDED = new Error('RATE_LIMIT_EXCEEDED')
RATE_LIMIT_EXCEEDED.name = 'Rate Limit Exceeded'
RATE_LIMIT_EXCEEDED.message = 'Your rate limit has been exceeded. Please wait 1 second and try again'

// Ingests IP Address of the reques
const addRate = ip => {
  const rate = propOr(0, ip, rates)
  if (gte(rate, 3)) throw RATE_LIMIT_EXCEEDED
  rates = assoc(ip, sum([rate, 1]), rates)
  return rates
}

module.exports.addRate = addRate
module.exports.RATE_LIMIT_EXCEEDED = RATE_LIMIT_EXCEEDED
