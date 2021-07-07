const express = require("express");
require("./db/connection");
const path = require("path");
const hbs = require("hbs");
const app = express();
const User = require("./models/usermsg");
const port = process.env.PORT || 3000;
//setting the path
const StaticPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//middleware
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
app.use(express.urlencoded({ extended: false }));
app.use(express.static(StaticPath));
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
//routing
app.get("/", (req, res) => {
  res.render("index");
});
app.post("/contact", async (req, res) => {
  try {
    // res.send(req.body);
    const userData = new User(req.body);
    await userData.save();
    res.status(201).render("index");
  } catch (err) {
    res.status(500).send(err);
  }
});
app.listen(port, () => {
  console.log(`App is running at port number ${port}`);
});
