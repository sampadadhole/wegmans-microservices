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

  async getCustomerProfile(id) {
    try {
      const customer = await CustomerDetailModel.findById(id);
      return customer;
    } catch (error) {
      console.log(error);
      return null;
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
    // console.log({ _id });
    const profile = await CustomerDetailModel.findById(_id);
    const addressResult = await address.save();
    if (profile) profile.address.push(address);

    return await profile.save();
  }

  async AddToCart(data) {
    try {
      const cust_id = data.customerId;
      const { id, name, color, quantity, price } = data;
      console.log({ id });
      const profile = await CustomerDetailModel.findById(cust_id).populate(
        "cart"
      );
      if (profile) {
        profile.cart.push({
          _id: id,
          name: name,
          color: color,
          quantity: quantity,
          price: price,
        });
      }
      return await profile.save();
    } catch (error) {
      console.log(error);
    }
  }
  async addToWishList(data) {
    try {
      const cust_id = data.customerId;
      const { id, name, color, quantity, price } = data;
      const profile = await CustomerDetailModel.findById(cust_id);
      if (profile)
        profile.wishlist.push({
          _id: id,
          name: name,
          color: color,
          quantity: quantity,
          price: price,
        });
      return await profile.save();
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = CustomerDBOperation;
