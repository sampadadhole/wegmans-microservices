const CustomerService = require("../services/customerService");

module.exports = (app) => {
  const service = new CustomerService();
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
    const data = await service.login(email, password);
    console.log({ data });
    if (data) {
      return res.status(200).send("User Logged In");
    } else return res.status(404).send("User not found");
  });
};
