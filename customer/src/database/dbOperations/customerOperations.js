const CustomerDetailModel = require("../schemas/CustomerData");
const AddressModel = require("../schemas/Address");
const bcrypt = require("bcrypt");
const SessionModel = require("../schemas/Session");

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

  async setUserSession(id, customer) {
    try {
      const ifSessionExists = await SessionModel.findOne({
        customer: customer,
      });
      console.log({ ifSessionExists });
      if (!ifSessionExists) {
        const session = await SessionModel.create({
          session_id: id,
          customer: customer,
        });

        const sessionResult = session.save();
        return sessionResult;
      } else return null;
    } catch (error) {
      console.log(error);
    }
  }

  async getUserSessionByUser(customer) {
    const ifSessionExists = await SessionModel.findOne({
      customer: customer,
    });
    return ifSessionExists;
  }

  async getUserSession(id) {
    try {
      const session = await SessionModel.findOne({
        session_id: id,
      });
      console.log({ session });
      return session;
    } catch (error) {
      console.log(error);
    }
  }

  async CreateNewAddress(
    _id,
    AddressLine1,
    AddressLine2,
    city,
    state,
    country,
    zipCode
  ) {
    const address = await AddressModel.create({
      AddressLine1: AddressLine1,
      AddressLine2: AddressLine2,
      City: city,
      State: state,
      Country: country,
      ZipCode: zipCode,
    });
    const profile = await CustomerDetailModel.findById(_id);
    const addressResult = await address.save();
    if (profile) profile.address.push(address);

    return await profile.save();
  }
}
module.exports = CustomerDBOperation;
