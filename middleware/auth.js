module.exports.auth = (req, res, next) => {
  req.user = {
    _id: '64da107d3ebb24fe1d2fee97',
  };
  next();
};
