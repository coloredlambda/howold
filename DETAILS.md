# Implementation Details
This was built using
- Node.JS - Javascript Runtime for servers
- Express JS - HTTP library
  - I chose Express JS because it is lightweight enough to get this done in a day.
  - I created the /howold route using Express
- Meltwater/Phi - Utility library
  - Meltwater/Phi is a great functional utility library to write more terse code
  - Used it to do validation
  - Used it to calculate the age from the dob
- Express Rate Limit - Utility library for rate limiting
  - I originally tried building a custom rate limiter just for this purposes but it was flaky, so I switched to this
  to meet deadline

