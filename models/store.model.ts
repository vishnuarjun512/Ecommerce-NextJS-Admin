import mongoose from "mongoose";

export const storeSchema = new mongoose.Schema({
    storeName: {
        type: String,
        required: [true, "Please Provide a storename"],
        unique: true,
    },
    userId:{
        type:String,
        required:[true, "Please Provide a User Id"]
    },
    billboards: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Billboard"
        }
    ]
    
}, { timestamps: true });

// Define the StoreDocument type
export type StoreDocument = Document & {
    storeName: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  };

const Store = mongoose.models.Store || mongoose.model<StoreDocument>("Store", storeSchema);

export default Store;
