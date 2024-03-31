const { publishMessage } = require("../utils");
const { CUSTOMER_BINDING_KEY } = require("../config");
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

  app.post("/addToCart/:id", async (req, res, next) => {
    try {
      const prod = await product.addToCart(req.params.id);
      return res.status(200).send(prod);
    } catch (err) {
      res.status(404).send(err);
      return err;
    }
  });
};
