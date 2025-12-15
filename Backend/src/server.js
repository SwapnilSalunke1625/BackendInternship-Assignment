import dotenv from "dotenv"
import db from "./db/index.js"

import { app } from "./app.js"
dotenv.config()

const PORT=process.env.PORT || 1010

db()
.then(()=>{
    app.listen(PORT, ()=>{
      console.log(`Server is running on port : ${PORT}`)
    })
})
.catch((error)=>{
    console.log("MONGODB CONNECTION FAILED !!!", error)
})



