require("dotenv").config();
const express = require("express");
const { or, isFalse, lt } = require("@meltwater/phi");

// Middlewares
const rateLimit = require("express-rate-limit");

// Utils
const createGetAge = require("./util/get-age");
const validateDob = require("./util/validate-dob");

const PORT = or(process.env.PORT, 8080);

const app = express();

app.use(rateLimit({
    windowMs: 1000,
    max: 3,
    standardHeaders: true
}));

app.get("/howold", (req, res) => {
  const { dob } = req.query;
  const validatedDob = validateDob(dob);

  if (isFalse(validatedDob)) {
    return res.status(200).json({ success: false, age: null });
  }

  const getAge = createGetAge(new Date().getTime());
  const age = getAge(new Date(validatedDob));

  if (lt(age, 0)) {
    return res.status(200).json({ success: false, age: null });
  }

  return res.status(200).json({ success: true, age });
});

app.listen(PORT, () => {
  console.log("Server started on", PORT);
});
