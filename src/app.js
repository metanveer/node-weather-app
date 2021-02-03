const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const port = 3000;

const app = express();

//Define paths for Express Config

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Tanveer",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Tanveer",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "This is some helpful text",
    name: "Tanveer",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "No address provided!",
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, place } = {}) => {
    if (error) return res.send({ error });

    forecast(latitude, longitude, (error, forcastData) => {
      if (error) return res.send({ error });

      res.send({
        forecast: forcastData,
        location: place,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Your must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Help article not found",
    name: "Tanveer",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Page not found",
    name: "Tanveer",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}...`);
});
