const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {

  const token = req.headers.authorization;
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token.split(" ")[1], process.env.TOKEN_SECRET || "loginsecret" , (err) =>{
      if (err) {
        res.status(400).send(err);
        } else {
          next();
      }
    });
  
    // req.user = verified;
  
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
  
};





