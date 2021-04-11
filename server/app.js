const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
require("./db/conn");

const Register = require("./models/registers");
const port = process.env.POST || 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("hello");
});

app.post("/send", async (req, res) => {
  try {
      const name = req.body.name;
      const password = req.body.password;
      const date=req.body.date;
      const image=req.body.image;
      const lat=req.body.lat;
      const lon=req.body.lon;
      const latval=req.body.latval;
      const lonval=req.body.lonval;

      if(latval!= null &&lonval!=null){
        Register.update({name:name,password:password,information:{ $elemMatch:{date:"2021-04-07"}}},{$push:{"information.$.location":{lat:latval,long:lonval}}}).then(result => {
          console.log("find",result);
        })
        .catch(err => {
          console.log(err);
        });
  

      }

      if( Register.findOne({name:name,password:password})!=null&&date!=null &&image!=null){
        Register.update({name:name,password:password },{$push:{information:{image:image,date:"2021-04-07",location:{lat:lat,long:lon}}}}).then(result => {
          console.log("find",result);
        })
        .catch(err => {
          console.log(err);
        });
      }

     
  Register.findOne({name:name,password:password}).then(result => {
    res.status(201).json(result);
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