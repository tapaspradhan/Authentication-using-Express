const express=require("express")
const cookieParser=require("cookie-parser")
const cors=require("cors")

const app=express()
const authRouter=require("./router/authRouter.js")
const databaseConnect=require("./config/databaseConfig.js")

databaseConnect()

app.use(express.json())
app.use(cookieParser())
app.use(cors(
    {
        origin:"*",
        credentials:true
    }
))


app.use("/api/auth/",authRouter)

app.use("/",(req,res)=>{
    res.status(200).json({data:"JWTauth server"})
})

module.exports=app;