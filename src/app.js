const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const User = require("./models/userinput");
require("./db/conn");

const port = process.env.PORT || 3000;

// ---- for index.html file -----
// // setting the path
const staticpath = path.join(__dirname, "../public");
// console.log(staticpath);
// // middleware
app.use(express.static(staticpath));

// MOST IMPORTANT LINE 💀💀
app.use(express.urlencoded({ extended: false }));

// --------- adding BOOTSTRAP & Jquery ------
app.use(
  "/css",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css"))
);

app.use(
  "/js",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js"))
);

app.use(
  "/jq",
  express.static(path.join(__dirname, "../node_modules/jquery/dist"))
);

// setting path
const templatepath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");

// set view engine
app.set("view engine", "hbs");
app.set("views", templatepath);
hbs.registerPartials(partialpath);

// app.get(path, callback)
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/contact", async (req, res) => {
  try {
    // res.send(req.body);
    const userData = new User(req.body);
    await userData.save();
    res.status(201).render("index");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running at port number ${port}`);
});
