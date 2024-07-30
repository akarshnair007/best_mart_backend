const express = require("express");

const userController = require("./controllers/userController");
const projectController = require("./controllers/projectController");
const wishlistController = require("./controllers/wishlistController");
const cartController = require("./controllers/cartController");
const jwt = require("./middleware/jwtMiddleware");

const routes = new express.Router();

routes.get("/all-product", projectController.getAllProjectController);
routes.post("/register", userController.registerController);
routes.post("/login", userController.loginController);
routes.post("/add-wishlist", jwt, wishlistController.addToWishListController);
routes.get("/get-wishlist", jwt, wishlistController.getWishListController);
routes.delete("/delete-wishlist/:id", wishlistController.removeWishListItem);
routes.get("/view-product/:id", projectController.getAProduct);
routes.post("/add-cart", jwt, cartController.addToCartController);
routes.get("/get-cart", jwt, cartController.getAllCartProducts);
routes.delete("/delete-cart/:id", cartController.removeItemfromCart);
routes.delete("/empty-cart", jwt, cartController.emptyCartController);
routes.get("/cart/increment/:id", cartController.incrementController);
routes.get("/cart/decrement/:id", cartController.decrementController);
module.exports = routes;
