const { compose, when, always } = require('@meltwater/phi')

module.exports = dob => compose(
  when(Number.isNaN, always(false)),
  Number
)(dob)
