import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order",
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
    }
}, { timestamps:true })

export type orderItemDocument = Document & {
    _id:string,
    orderId: string,
    productId:string,
}

const orderItem = mongoose.models.Product as mongoose.Model<orderItemDocument> || mongoose.model("orderItem", orderItemSchema);

export default orderItem;