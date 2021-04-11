const mongoose=require("mongoose");

const empolyeeSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true
        
    },
    password:{
        type:String,
        require:true,
        unique:true

    },
    information:[
        {
            date:{
               type:String,
            unique:true
        },
            image:String,
            location:[
                {
                    lat:Number,
                    long:Number
                }
            ]
        }
    ]
})

const Register= new mongoose.model("Register",empolyeeSchema);

module.exports=Register;