module.exports = {
  db: {
    connection: process.env.MONGODBURL
  },

  mail: {
    user: process.env.MAILUSER,
    pass: process.env.MAILPASS
  }
};
