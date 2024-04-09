// const express = require("express");
// const dotenv = require("dotenv");
// const userRoutes = require("./routes/userRoutes.js");

// dotenv.config();
// const app = express();
// app.use(express.json());
// app.use("/api/user", userRoutes);

// const PORT = process.env.PORT || 8081;
// app.listen(PORT, () => {
//   console.log("Server is running on port ", +PORT);
// });

// const bodyParser = require('body-parser');

// const app = express();

// // Parse incoming request bodies with JSON payload
// app.use(bodyParser.json());

const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");
const { errorHandler } = require("./middleware/errorHandler");
const user = require("./models/userModel");
const connectDb = require("./config/dbConnection");
require("dotenv").config();
connectDb();
const app = express();
app.use(cors());
app.use(express.json());
// For form data, use express.urlencoded():
app.use(express.urlencoded({ extended: true })); // Or false depending on your needs

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
// app.use("/api/users", async (req, res) => {
//   const { username } = "Priya";
//   console.log(req.body);
//   const result = await user.create({ username });
//   res.writeHead(200, { "Contenet-Type": "text/html" });
//   res.write(result);
//   res.end();
// });

app.use("/api/users", userRoutes, exerciseRoutes);
// app.post("/api/users", (req, res) => {
//   // Extract the form data from the request body
//   const username = req.body.username;

//   // Do something with the username
//   console.log("Received username:", username);

//   // Send a response
//   res.send("User created successfully");
// });
app.use(errorHandler);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
