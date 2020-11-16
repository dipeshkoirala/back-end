
const express=require('express')
// const db= require('./data')
// const bodyParser=require('body-parser')

const welcomeRouter=require("./router/welcome-router")
const authRouter=require("./router/auth-router")


const port = 3333       

const server=express()


server.use(express.json())
server.use(logger)
// server.use(helmet())


server.use("/",logger,welcomeRouter)
console.log(authRouter)

server.use("/login",logger,authRouter)

// server.get("/", (req, res) => {
// 	res.json({
// 		message: "Welcome to our API",
// 	})
// })
server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})
module.exports=server


// logger middleware
function logger(req, res, next) {
    console.log(
      `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
        'Origin'
      )}`
    );
  
    next();
  }