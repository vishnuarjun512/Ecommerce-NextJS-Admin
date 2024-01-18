import Order from "@/models/order.model";
import mongoose from "mongoose";
import giveOrderDetails from "./giveOrderDetails";

export default async function getTotalRevenue(storeId:string) {
    try {
  
        const paidOrders = await giveOrderDetails(storeId);

        const totalRevenue = paidOrders.reduce((total:number, order:any) => {
            const orderTotal = order.orderItems.reduce((orderSum:number, item:any) => orderSum + item.productId.price,0);
            return total+orderTotal;
        },0);

        return totalRevenue;
    } catch (error) {
        console.log(error)
        return 0;
    }
}