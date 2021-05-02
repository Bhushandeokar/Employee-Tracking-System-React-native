const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/first3",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection Mongoose");
}).catch((e)=>{
    console.log("no con");  
})