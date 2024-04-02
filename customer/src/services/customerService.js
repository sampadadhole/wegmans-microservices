const DB = require("../database/");
const {
  GenerateHash,
  GenerateSalt,
  ValidatePassword,
  generateToken,
} = require("../utils");
//ALl business logic is here
class CustomerService {
  constructor() {
    this.repo = new DB.CustomerDBOperation();
  }
  async signUp(name, email, password, phone) {
    const salt = await GenerateSalt();
    const hashPassword = await GenerateHash(password, salt);

    // const customer = new DB.CustomerDBOperation();
    const result = await this.repo.CreateCustomer(
      name,
      email,
      hashPassword,
      phone,
      salt
    );
    console.log(result._id);
    const token = await generateToken({ id: result._id, email: email });
    console.log({ token });
    return { id: result._id, token: token };
  }

  async existingCustomer(email) {
    const ifExists = await this.repo.findCustomer(email);
    return ifExists;
  }

  async getCustomerProfile(_id) {
    try {
      const customer = await this.repo.getCustomerProfile(_id);
      return customer;
    } catch (error) {
      console.log(error);
    }
  }

  async login(email, password) {
    const customer = await this.repo.findCustomer(email);
    if (customer) {
      const validPassword = await ValidatePassword(
        password,
        customer.password,
        customer.salt
      );
      if (validPassword) {
        const token = await generateToken({ id: customer._id, email: email });
        console.log({ token });
        return { customer, token };
      }
      // console.log({ validPassword });
      return null;
    }
  }

  async setUserSession(id, customer) {
    return this.repo.setUserSession(id, customer);
  }

  async getUserSession(id) {
    return this.repo.getUserSession(id);
  }
  async getUserSessionByUser(customer) {
    return this.repo.getUserSessionByUser(customer);
  }

  async addAddress(
    _id,
    AddressLine1,
    AddressLine2,
    city,
    state,
    country,
    zipCode
  ) {
    const address = await this.repo.CreateNewAddress(
      _id,
      AddressLine1,
      AddressLine2,
      city,
      state,
      country,
      zipCode
    );
    return address;
  }

  async addToCart(data) {
    const cart = await this.repo.AddToCart(data);
    return cart;
  }
  async addToWishList(data) {
    const cart = await this.repo.addToWishList(data);
    return cart;
  }

  async SubscribeEvents(payload) {
    payload = JSON.parse(payload);
    payload = JSON.parse(payload);
    const { event, data } = payload;
    switch (event) {
      case "ADD_TO_CART":
        this.addToCart(data);
        break;
      case "ADD_TO_WISHLIST":
        this.addToWishList(data);
        break;
    }
  }
}

module.exports = CustomerService;
