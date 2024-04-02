const { publishMessage } = require("../utils");
const { CUSTOMER_BINDING_KEY } = require("../config");
const verifyToken = require("../api/middleware/auth");
const ProductService = require("../services/productService");

module.exports = (app, channel) => {
  const product = new ProductService();

  app.get("/getproduct", async (req, res, next) => {
    publishMessage(channel, CUSTOMER_BINDING_KEY, "Hello");
    return res.status(200).send("product found");
  });

  app.post("/addproduct", async (req, res, next) => {
    const { name, color, quantity, price } = req.body;
    const prod = await product.addProduct(name, color, quantity, price);
    return res.status(200).send(prod);
  });

  app.get("/getallproducts", async (req, res, next) => {
    try {
      const prod = await product.getAllProducts();
      return res.status(200).send(prod);
    } catch (err) {
      return err;
    }
  });

  app.get("/getproduct/:id", async (req, res, next) => {
    try {
      const prod = await product.getProductById(req.params.id);
      return res.status(200).send(prod);
    } catch (err) {
      res.status(404).send(err);
      return err;
    }
  });

  app.post("/addToCart/:id", verifyToken, async (req, res, next) => {
    try {
      const customerId = req.params.id;
      const { id, name, color, quantity } = req.body;
      const inputs = { customerId, id, name, color, quantity };
      const payLoad = {
        event: "ADD_TO_CART",
        data: inputs,
      };
      publishMessage(channel, CUSTOMER_BINDING_KEY, JSON.stringify(payLoad));
      return res.status(200).send(prod);
    } catch (err) {
      res.status(404).send(err);
      return err;
    }
  });

  app.post("/addToWishlist/:id", verifyToken, async (req, res, next) => {
    try {
      const customerId = req.params.id;
      const { id, name, color, quantity } = req.body;
      const inputs = { customerId, id, name, color, quantity };
      const payLoad = {
        event: "ADD_TO_WISHLIST",
        data: inputs,
      };
      publishMessage(channel, CUSTOMER_BINDING_KEY, JSON.stringify(payLoad));
      return res.status(200).send(prod);
    } catch (err) {
      res.status(404).send(err);
      return err;
    }
  });
};
