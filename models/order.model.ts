import mongoose from "mongoose";
import { OrderItemDocument } from "./orderItem.model";

const orderSchema = new mongoose.Schema({
    storeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Store",
    },
    isPaid:{
        type:Boolean,
    },
    name:{
        type:String,
    },
    phone :{
        type:String,
    },
    address:{
        type:String,
    },
    orderItems:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"OrderItem"
        }
    ],

}, { timestamps:true })

export type OrderDocument = Document & {
    _id:string,
    name:string,
    storeId: string,
    isPaid:boolean,
    phone:string,
    address:string,
    orderItems: OrderItemDocument[],
    createdAt:string,
}

const Order = mongoose.models.Order as mongoose.Model<OrderDocument> || mongoose.model("Order", orderSchema);

export default Order;