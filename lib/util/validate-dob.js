const { compose, when, always, isNilOrEmpty } = require("@meltwater/phi")

module.exports = dob => compose(
  when(() => isNilOrEmpty(dob), always(false)),
  when(Number.isNaN, always(false)),
  Number
)(dob)
