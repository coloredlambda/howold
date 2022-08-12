const { assoc, propOr, sum, gte, reject } = require('@meltwater/phi')

let rates = { '442': 2 }

const clearRates = () => rates = {}

setInterval(clearRates, 1000)

const RATE_LIMIT_EXCEEDED = new Error('RATE_LIMIT_EXCEEDED')
RATE_LIMIT_EXCEEDED.name = 'RATE_LIMIT_EXCEEDED'
RATE_LIMIT_EXCEEDED.message = 'Your rate limit has been exceeded. Please wait 1 second and try again'

// Ingests IP Address of the request
module.exports.addRate = ip => {
    const rate = propOr(0, ip, rates)
    if(gte(rate, 3)) throw RATE_LIMIT_EXCEEDED
    rates = assoc(ip, sum([rate, 1]), rates)
    return rates
}

module.exports.RATE_LIMIT_EXCEEDED = RATE_LIMIT_EXCEEDED

