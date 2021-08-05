require('dotenv/config');
module.exports = {
  App: {
    port: process.env.PORT,
    logger: {
      enabled: true,
      level: 'info',
    },
  },
};
