const CustomerDetailModel = require("../schemas/CustomerData");
const bcrypt = require("bcrypt");

//All DB Operations are here

class CustomerDBOperation {
  async CreateCustomer(name, email, password, phone, salt) {
    try {
      const customer = await CustomerDetailModel.create({
        name: name,
        email: email,
        salt: salt,
        password: password,
        phone: phone,
        address: [],
      });
      const customerResult = await customer.save();
      return customerResult;
    } catch (error) {
      console.log(error);
    }
  }

  async findCustomer(email) {
    try {
      const customer = await CustomerDetailModel.findOne({
        email: email,
      });
      return customer;
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = CustomerDBOperation;
