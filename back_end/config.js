const mongoose=require("mongoose");


async function connect(){
    await mongoose.connect("mongodb://127.0.0.1:27017/teengo_db", {useNewUrlParser:true});
}

connect().then(()=>{
    console.log("connected to db seccessfully");
}).catch(e=>console.log(e));