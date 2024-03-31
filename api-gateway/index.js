const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");
const app = express();

app.use(express.json());
app.use(cors());

// app.use("/shopping", proxy("http://localhost:8003"));
// app.use("/customer", proxy("http://localhost:8001"));
// app.use("/", proxy("http://localhost:8002"));

app.listen(8000, () => {
  console.log("api-gateway Service is running on port 8000");
});
