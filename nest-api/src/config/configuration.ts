export default () => ({
  jwtSecret: process.env.jwtSecret,
  env: process.env.ENV,
  tmdbKey: process.env.TDMB_KEY,
});
