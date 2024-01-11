import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    storeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Store",
    },
    isPaid:{
        type:Boolean,
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
    ]

}, { timestamps:true })

export type OrderDocument = Document & {
    _id:string,
    storeId: string,
    isPaid:boolean,
    phone:string,
    address:string,
}

const Order = mongoose.models.Order as mongoose.Model<OrderDocument> || mongoose.model("Order", orderSchema);

export default Order;