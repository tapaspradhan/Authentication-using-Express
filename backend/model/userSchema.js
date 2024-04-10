const mongoogse=require("mongoose")
const {Schema}=mongoogse
const JWT=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const userSchema=new Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        minLength:[5, "Name must be 5 charactor"],
        maxLength:[20, "Name must be 5 charactor"],
        true:true
    },
    email:{
        type:String,
        required:[true, "user name is required"],
        unique:true,
        lowercase:true,
        unique:[true,"already register"]
    },
    password:{
        type:String,
        select:false
    },
    forgotPasswordToken:{
        type:String
    },
    forgotPasswordExpiryDate:{
        type:Date
    },
    username:{
        type:String
    },
    bio:{
        type:String
    }
},{
    timestamps:true
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password=await bcrypt.hash(this.password, 10)
    return next()
})

// userSchema.methods.jwtToken=
//     function (){
//         const token= JWT.sign(
//             {id: this._id, email:this.email},
//             process.env.SECRET,
//             {expriesIn:"24h"}
//         )
//         console.log(token)
//         return token
//     }
    userSchema.methods.jwtToken = function() {
        const token = JWT.sign({ _id: this._id }, process.env.SECRET); 
        return token;
      };


const userModel=mongoogse.model("user",userSchema)

module.exports=userModel;