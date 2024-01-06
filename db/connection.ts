import mongoose from "mongoose";


export async function connect() {
    try {
        
        mongoose.connect(process.env.MONGO_URI!);

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("Connected to MONGO DB named -", process.env.MONGO_URI?.split("/")[3])
        })

        connection.on('error', (err) => {
            console.log("MongoDB Connection Error -> ", err)
        })
        
    } catch (error) {
        console.log("Connection to DB Failed -> ",error)
        process.exit();
    }
}