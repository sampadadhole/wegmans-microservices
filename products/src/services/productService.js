const DB = require("../database");

class ProductService {
  constructor() {
    this.repo = new DB.ProductDBOperation();
  }

  async addProduct(name, color, quantity, price) {
    try {
      const prod = await this.repo.AddNewProduct(name, color, quantity, price);
      return prod;
    } catch (err) {
      throw err;
    }
  }

  async getAllProducts() {
    try {
      const prod = await this.repo.getAllProducts();
      return prod;
    } catch (err) {
      throw err;
    }
  }

  async getProductById(id) {
    try {
      console.log({ id });
      const prod = await this.repo.getProductById(id);
      return prod;
    } catch (err) {
      throw err;
    }
  }

  // async getProductPayLoad()
}
module.exports = ProductService;
