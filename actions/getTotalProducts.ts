import Order from "@/models/order.model";
import Product from "@/models/product.model";

export default async function getTotalProducts(storeId:string) {
    try {
        const totalProducts= await Product.countDocuments({
            storeId,
        })
        return totalProducts;
    } catch (error) {
        console.log(error)
        return 0;
    }
}