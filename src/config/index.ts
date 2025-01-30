import mongoose from "mongoose";

mongoose.connect(`${process.env.MONGO_URI}`).then(() => {
    console.log(`Mongodb connected!`)
}).catch((err: any) => {
    console.log(`Mongodb connection error :: ${err}`)
})