import mongoose from "mongoose";

export async function connectToDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/habit-tracker');
        console.log("db is connected");
    }catch(e) {
        console.error(e);
    }
}
