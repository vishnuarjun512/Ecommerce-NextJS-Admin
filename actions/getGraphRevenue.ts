import Order, { OrderDocument } from "@/models/order.model";
import { OrderItemDocument } from "@/models/orderItem.model";
import mongoose from "mongoose";

export interface GraphData{
    name:string,
    total: number,
}

export default async function getGraphRevenue(storeId:string) {
    try {
        const paidOrders:OrderDocument[] = await Order.find({
            storeId,
            isPaid:true,
        }).populate({
            path: "orderItems",
            populate: {
                path:"productId",
                model:"Product",
            },
        }) 

        const monthlyRevenue: {[key:number]:number} = {}

        

        for(const order of paidOrders){
            const time = new Date(order.createdAt);
            const month = time.getMonth() + 1;
            let revenueForOrder = 0;

            order.orderItems.map((item:any) => {
                    revenueForOrder += item.productId.price
            })

            monthlyRevenue[month] = (monthlyRevenue[month] || 0 ) + revenueForOrder;
        }

       const graphData: GraphData[] = [
        {name:"Jan",total:0},
        {name:"Feb",total:0},
        {name:"Mar",total:0},
        {name:"Apr",total:0},
        {name:"May",total:0},
        {name:"Jun",total:0},
        {name:"Jul",total:0},
        {name:"Aug",total:0},
        {name:"Sep",total:0},
        {name:"Oct",total:0},
        {name:"Nov",total:0},
        {name:"Dec",total:0},
       ]

       for(const month in monthlyRevenue){
        graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)]
       }

      
       return graphData;
    } catch (error) {
        console.log(error)
        return 0;
    }
}