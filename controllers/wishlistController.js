const wishes = require("../model/wishlistModel");

exports.addToWishListController = async (req, res) => {
  const { id, title, price, description, category, image, rating } = req.body;
  const userId = req.payload;
  try {
    const exisitingProduct = await wishes.findOne({ id, userId });
    if (exisitingProduct) {
      res.status(406).json("Product already in wishlist");
    } else {
      const newProduct = new wishes({
        id,
        title,
        price,
        description,
        category,
        image,
        rating,
        userId,
      });
      await newProduct.save();
      res.status(200).json(newProduct);
    }
  } catch (err) {
    res.status(401).json(err);
  }
};
exports.getWishListController = async (req, res) => {
  const userId = req.payload;
  try {
    const allWishListItem = await wishes.find({ userId });
    if (allWishListItem) {
      res.status(200).json(allWishListItem);
    } else {
      res.status(406).json("Your Wishlist is empty");
    }
  } catch (err) {
    res.status(406).json(err);
  }
};

exports.removeWishListItem = async (req, res) => {
  const { id } = req.params;
  console.log("Inside delete Controller", id);
  try {
    const products = await wishes.findByIdAndDelete({ _id: id });
    res.status(200).json(products);
  } catch (error) {
    res.status(401).json(err);
  }
};
