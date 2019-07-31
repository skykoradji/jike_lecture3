const withCSS = require('@zeit/next-css')
module.exports = withCSS({
  env: {
    PROJECT_ID: process.env.PROJECT_ID,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    CLIENT_EMAIL: process.env.CLIENT_EMAIL
  }
  /* config options here */
});