const productSchema = require("../schemas/Product");

class ProductDBOperation {
  async AddNewProduct(name, color, quantity, price) {
    try {
      const prod = await productSchema.create({
        name: name,
        color: color,
        quantity: quantity,
        price: price,
        createdAt: new Date(),
      });

      const prodResult = await prod.save();
      return prodResult;
    } catch (err) {
      return err;
    }
  }

  async getAllProducts() {
    try {
      const prod = await productSchema.find({});
      return prod;
    } catch (err) {
      return err;
    }
  }

  async getProductById(id) {
    try {
      const prod = await productSchema.findById({ _id: id });
      return prod;
    } catch (err) {
      return err;
    }
  }
}

module.exports = ProductDBOperation;
