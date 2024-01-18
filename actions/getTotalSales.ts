import Order from "@/models/order.model";

export default async function getTotalSales(storeId:string) {
    try {
        const totalSales = await Order.countDocuments({
            storeId,
            isPaid:true,
        })
        return totalSales;
    } catch (error) {
        console.log(error)
        return 0;
    }
}