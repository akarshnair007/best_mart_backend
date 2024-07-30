const products = require("../model/projectModel");

exports.getAllProjectController = async (req, res) => {
  try {
    const allProduct = await products.find();
    res.status(200).json(allProduct);
  } catch (error) {
    res.status(401).json(error);
  }
};
exports.getAProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const exisitingProduct = await products.findOne({ id });
    res.status(200).json(exisitingProduct);
  } catch (error) {
    res.status(406).json(err);
  }
};
