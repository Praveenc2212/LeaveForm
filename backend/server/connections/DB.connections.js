import mongoose from "mongoose";

export const DB = { connect : (url) => {
    mongoose.connect(url)
            .then(() => console.log("Database Connected Successfully..."))
            .catch(error => console.error("Database Connection Failed...", error))
}}