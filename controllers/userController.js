const users = require("../model/userModel");
const jwt = require("jsonwebtoken");

exports.registerController = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);

  try {
    const exisitingUser = await users.findOne({ email });
    if (exisitingUser) {
      res.status(402).json("User already exists");
    } else {
      const newUsers = new users({
        username,
        email,
        password,
      });
      await newUsers.save();
      res.status(200).json(newUsers);
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.loginController = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const exisitingUser = await users.findOne({ email, password });
    if (exisitingUser) {
      const token = jwt.sign({ userId: exisitingUser._id }, "secretsuperkey");
      res.status(200).json({ exisitingUser, token });
    } else {
      res.status(401).json("Incorrect Email or Password");
    }
  } catch (error) {
    res.status(401).json(error);
  }
};
