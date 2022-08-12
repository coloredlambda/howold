const { assoc, propOr, sum, gte, reject } = require('@meltwater/phi')

let rates = { '442': 2 }

const clearRates = () => {
    rates = {}
    console.log('The new rate', rates)
}

setInterval(clearRates, 5000)

// Ingests IP Address of the request
module.exports = ip => {
    const rate = propOr(0, ip, rates)
    if(gte(rate, 3)) throw new Error('RATE_LIMIT_EXCEEDED')
    rates = assoc(ip, sum([rate, 1]), rates)
    return rates
}

