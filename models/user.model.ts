import mongoose from "mongoose";
const storeSchema = new mongoose.Schema({
    storeName: {
        type: String,
        required: [true, "Please Provide a storename"],
        unique: true,
    },
    userId:{
        type:String,
        required:[true, "Please Provide a User Id"]
    }
}, { timestamps: true });

const Store = mongoose.models.Store || mongoose.model("Store", storeSchema);

export default Store;
