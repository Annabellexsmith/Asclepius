const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
// const session = require('express-session');
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const practitionersRouter = require("./controllers/practitioners.js");
const usersRouter = require("./controllers/users.js");

const User = require("./models/user");
const Practitioner = require("./models/practitioner.js")

/*
=============== DB Setup =============== */
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

/*
=============== Middleware =============== */
const isSignedIn = require("./middleware/is-signed-in.js");
const passUserToView = require("./middleware/pass-user-to-view.js");

/*
=============== DB Setup =============== */
app.use(cors());
app.use(express.json());
// Allow HTML forms to send PUT/DELETE requests instead of just GET or POST
app.use(methodOverride("_method"));
app.use(passUserToView);

/*
=============== Routes =============== */

app.get("/", (req, res) => {
  res.send("this is the homepage from localhost 3000 backend");
});

app.listen(3000, () => {
  console.log("The express app is ready!");
});
