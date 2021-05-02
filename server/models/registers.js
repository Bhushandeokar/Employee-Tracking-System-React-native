const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    AllEmployee: [
      {
            CompanyName:{
                type:String,
                require: true
            },
            Username: {
                type: String,
                require: true,
                unique: true
            },
            Password: {
                type: String,
                require: true,
                unique: true
            },
            EmployeeName: {
                type: String,
                require: true,
            },
            EmployeeID: {
                type: String,
                require: true,
                unique: true
            },
            information: [
                {
                    date: {
                        type: String,
                    },
                     LoginTime: {
                        type: String,
                    },
                     LogoutTime: {
                        type: String,
                    },
                    image: String,
                    location: [
                        {
                            lat: Number,
                            long: Number
                        }
                    ]
                }
            ]
        }
    ]
})

const CompanyEmployess = new mongoose.model("CompanyEmployee", EmployeeSchema);

module.exports = CompanyEmployess;