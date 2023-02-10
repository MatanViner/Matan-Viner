const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const session = require("express-session");

const { connection } = require("./db");
const port = 3000;
const CRUD = require("./CRUD");

app.engine("html", require("ejs").renderFile);
//INITS
app.use(express.static("static"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/home", (req, res) => {
  res.render(path.join(__dirname, "views/index.html"), {
    user: JSON.stringify(req.session?.user || null),
  });
});
app.get("/", (req, res) => {
  res.redirect("/home");
});
app.get("/register", (req, res) => {
  res.render(path.join(__dirname, "views/register.html"), {
    user: JSON.stringify(req.session?.user || null),
  });
});
app.get("/login", (req, res) => {
  res.render(path.join(__dirname, "views/login.html"), {
    user: JSON.stringify(req.session?.user || null),
  });
});

app.get("/about", (req, res) => {
  res.render(path.join(__dirname, "views/about.html"), {
    user: JSON.stringify(req.session?.user || null),
  });
});
app.get("/contact", (req, res) => {
  res.render(path.join(__dirname, "views/contact.html"), {
    user: JSON.stringify(req.session?.user || null),
  });
});
app.get("/plans", (req, res) => {
  res.render(path.join(__dirname, "views/plans.html"), {
    user: JSON.stringify(req.session?.user || null),
  });
});
app.get("/payment", (req, res) => {
  res.render(path.join(__dirname, "views/payment.html"), {
    user: JSON.stringify(req.session?.user || null),
  });
});

app.get("/check-username/:username", CRUD.checkUsername);
app.get("/profile", CRUD.getProfilePage);
app.get("/calculators", CRUD.getCalculatorPage);
app.get("/progress", CRUD.getProgressPage);
app.get("/api/table/create", CRUD.createDb);
app.get("/api/table/:tableName/:action", CRUD.handleTable);

app.post("/choose-plan", CRUD.choosePlan);
app.post("/register", CRUD.registration);
app.post("/login", CRUD.login);
app.post("/updateUser", CRUD.updateUser);
app.post("/api/add-measure", CRUD.addMeasure);
app.post("/api/measurements", CRUD.getMeasurementsByQuery);
app.post("/api/contact", CRUD.contact);

app.get("/logout", (req, res) => {
  console.log("logout");
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res.redirect("/");
    }
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
});

app.listen(port, () => {
  console.log("server is running on port" + port);
});
