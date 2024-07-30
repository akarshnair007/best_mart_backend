const jwt = require("jsonwebtoken");

const jwtmiddleware = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const jwtResponse = jwt.verify(token, "secretsuperkey");
    console.log("inside the cart", jwtResponse);
    req.payload = jwtResponse.userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json("Authorization failed");
  }
};

module.exports = jwtmiddleware;
