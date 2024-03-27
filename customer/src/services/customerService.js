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
    const ifExists = await this.repo.findCustomer(email);
    if (ifExists) {
      const validPassword = await ValidatePassword(
        password,
        ifExists.password,
        ifExists.salt
      );
      console.log({ validPassword });
      return validPassword;
    }
  }
}

module.exports = CustomerService;
