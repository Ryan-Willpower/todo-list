// next.config.js
const withSass = require("@zeit/next-sass")
module.exports = withSass({
  env: {
    BACKEND_HOSTNAME: "http://localhost:8000",
    GRAPHQL_HOSTNAME: "http://localhost:8000/graphql",
  },
})
