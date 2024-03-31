const CustomerService = require("../services/customerService");
// const { publishMessage } = require("../utils");
const { v4: uuidv4 } = require("uuid");
const { CUSTOMER_BINDING_KEY } = require("../config");
const {
  restrictToLoggedInUserOnly,
  verifyToken,
} = require("./middleware/auth");
const { subscribeMessage } = require("../utils");
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
      const data = await service.signUp(name, email, password, phone);
      console.log("Customer Created");
      return res.json(data);
    }
  });

  app.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    const { customer, validPassword } = await service.login(email, password);

    if (validPassword) {
      // const token = jwt.sign({ id: customer.id }, "microservices_secret", {
      //   expiresIn: "30days",
      // });
      // console.log({ token });
      // console.log(id);
      // console.log(customer.id);
      const ifSessionExists = await service.getUserSessionByUser(customer);
      console.log(ifSessionExists);
      if (!ifSessionExists) {
        const sessionId = uuidv4();
        await service.setUserSession(sessionId, customer);
        res.cookie("uid", sessionId);
      }

      return res.status(200).send("User Logged In");
    } else return res.status(404).send("User not found");
  });

  app.post("/address", restrictToLoggedInUserOnly, async (req, res, next) => {
    const { _id } = req.user.customer;
    const { AddressLine1, AddressLine2, city, state, country, zipCode } =
      req.body;
    const data = await service.addAddress(_id, {
      AddressLine1,
      AddressLine2,
      city,
      state,
      country,
      zipCode,
    });

    return res.json(data);
  });
};
