const DB = require("../database/");
const { GenerateHash, GenerateSalt, ValidatePassword } = require("../utils");
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
    return result;
  }

  async existingCustomer(email) {
    const ifExists = await this.repo.findCustomer(email);
    return ifExists;
  }

  async login(email, password) {
    const customer = await this.repo.findCustomer(email);
    if (customer) {
      const validPassword = await ValidatePassword(
        password,
        customer.password,
        customer.salt
      );
      console.log({ validPassword });
      return { customer, validPassword };
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
}

module.exports = CustomerService;
