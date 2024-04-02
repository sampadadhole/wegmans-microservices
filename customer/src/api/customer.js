const CustomerService = require("../services/customerService");
// const { publishMessage } = require("../utils");
const { v4: uuidv4 } = require("uuid");
const { CUSTOMER_BINDING_KEY } = require("../config");
const { verifyToken } = require("./middleware/auth");
const { subscribeMessage, generateToken } = require("../utils");
const jwt = require("jsonwebtoken");

module.exports = (app, channel) => {
  const service = new CustomerService();
  subscribeMessage(channel, service, CUSTOMER_BINDING_KEY);
  app.post("/signup", async (req, res, next) => {
    const { name, email, password, phone } = req.body;
    const existingCustomer = await service.existingCustomer(email);
    if (existingCustomer) {
      res.status(409).send("User already exists");
    } else {
      const { id, token } = await service.signUp(name, email, password, phone);
      res.header("Authorization", token);

      return res.json({ id: id, token: token });
    }
  });

  app.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    const { customer, validPassword } = await service.login(email, password);

    if (validPassword) {
      return res.status(200).json(customer);
    } else return res.status(404).send("User not found");
  });

  app.get("/profile/:id", async (req, res, next) => {
    const id = req.params.id;
    const data = await service.getCustomerProfile(id);
    return res.status(200).json(data);
  });

  app.post("/address", verifyToken, async (req, res, next) => {
    const { _id, AddressLine1, AddressLine2, city, state, country, zipCode } =
      req.body;
    const data = await service.addAddress(_id, {
      AddressLine1,
      AddressLine2,
      city,
      state,
      country,
      zipCode,
    });

    return res.status(200).json(data);
  });
};
