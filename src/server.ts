/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */

import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";



let server: Server ;



const startServer = async() => {
 try {
    // console.log(envVars.DB_URL)
     await mongoose.connect(envVars.DB_URL)


    //   await mongoose.connect("mongodb+srv://touradmin:touradmin@cluster0.n0rkl.mongodb.net/tour-db?retryWrites=true&w=majority&appName=Cluster0")
    
  console.log("connected to MongoDB")

 server =  app.listen(envVars.PORT, () => {
    console.log(`server is listening on port ${envVars.PORT}`);
  })
 } catch (error) {
    console.log(error)
 }
}
startServer()

// process.on("SIGTERM", () => {
//      console.log("SIGTERM error detected ..... Server is shutting down")
    
//     if(server){
//         server.close(() => {
//             process.exit(1)
//         })
//     }
//       process.exit(1)
// })
// process.on("SIGINT", () => {
//      console.log("SIGINT error detected ..... Server is shutting down")
    
//     if(server){
//         server.close(() => {
//             process.exit(1)
//         })
//     }
//       process.exit(1)
// })

// process.on("unhandedRejection", (error) => {
//      console.log("unhandedRejection error detected ..... Server is shutting down",error)
    
//     if(server){
//         server.close(() => {
//             process.exit(1)
//         })
//     }
//       process.exit(1)
// })
// process.on("uncaughtException", (error) => {
//    console.log("uncaughtException error detected ..... Server is shutting down",error);
   
//     if(server){
//         server.close(() => {
//             process.exit(1)
//         })
//     }
//       process.exit(1)
// })

// Promise.reject(new Error("I forgot to catch this promise"))

// throw new Error("I forgot to catch this local error")