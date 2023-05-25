const {default:mongoose}=require("mongoose");

const userSchema=mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }, 
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        default:""
    },
    wallPic:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    }
},  {timestamps:true});

const User=mongoose.model("users",userSchema);

module.exports=User;