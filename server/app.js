const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
require("./db/conn");

const CompanyEmployess = require("./models/registers");
const port = process.env.POST || 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/send", async (req, res) => {
  try {
    const name = req.body.name;
    const password = req.body.password;
    const date = req.body.date;
    const image = req.body.image;
    const lat = req.body.lat;
    const lon = req.body.lon;
    const latval = req.body.latval;
    const lonval = req.body.lonval;
    const LoginTime = req.body.LoginTime;
    const LogoutTime = req.body.LogoutTime;

    if (latval != null && lonval != null) {
      CompanyEmployess.update(
        { 'AllEmployee.Username': name },
        { $push: { "AllEmployee.$[outer].information.$[inner].location": { lat: latval, long: lonval } } },
        { "arrayFilters": [{ "outer.Username": name }, { "inner.date": "2021-05-12" }] }
      ).then(result => {
        console.log("find", result);
      })
        .catch(err => {
          console.log(err);
        });
    }

    if (CompanyEmployess.findOne(
      {}, { AllEmployee: { $elemMatch: { Username: name, Password: password } } }) != null
      && date != null && image != null) {
      CompanyEmployess.update(
        { AllEmployee: { $elemMatch: { Username: name, Password: password } } },
        {
          $push: {
            "AllEmployee.$.information":
              { image: image, date: "2021-05-12", LoginTime: LoginTime, location: { lat: lat, long: lon } }
          }
        }
      ).then(result => {
        console.log("find", result);
      })
      .catch(err => {
        console.log(err);
      });
    }
    if(LogoutTime!=null){
      CompanyEmployess.update(
        { 'AllEmployee.Username': name, },
        { $set: { "AllEmployee.$[outer].information.$[inner].LogoutTime":LogoutTime} },
        { "arrayFilters": [{ "outer.Username": name }, { "inner.date": "2021-05-12" }] }
      ).then(result => {
        console.log("find", result);
      })
        .catch(err => {
          console.log(err);
        });
      }

    CompanyEmployess.findOne(
      {}, { AllEmployee: { $elemMatch: { Username: name, Password: password } } }
    ).then(result => {
      res.status(201).json(result.AllEmployee[0]);

    })
      .catch(err => {
        console.log(err);
      });

  }
  catch (err) {
    console.log(err);

  }

});





app.listen(port, () => {
  console.log("Server is connected")
});