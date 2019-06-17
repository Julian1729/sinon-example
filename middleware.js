exports.authenticate = (req, res, next) => {

  // 401 unauthorized
  // 403 forbidden

  if(!req.session || req.session.authenticated !== true){
    return res.status(401).send();
  }

  if(!req.session.admin || req.session.admin !== true){
    return res.status(403).send();
  }

  next();

};
