const {compose, floor, divide, __, subtract} = require("@meltwater/phi");
const MILLISECONDS_IN_A_DAY = 1000 * 3600 * 24

module.exports = createGetAge = currentDate => compose(
    floor,
    divide(__, 365),
    divide(__, MILLISECONDS_IN_A_DAY),
    subtract(currentDate)
)
