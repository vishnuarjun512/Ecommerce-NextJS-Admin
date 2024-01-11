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

export type OrderItemDocument = Document & {
    _id:string,
    orderId: string,
    productId:string,
}

const orderItem = mongoose.models.OrderItem as mongoose.Model<OrderItemDocument> || mongoose.model("OrderItem", orderItemSchema);

export default orderItem;