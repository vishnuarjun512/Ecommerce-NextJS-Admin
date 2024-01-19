import Order from "@/models/order.model";
import OrderItem from "@/models/orderItem.model";
import Product from "@/models/product.model";

const giveOrderDetails = async (storeId:string) => {
    const orders = await Order.find({
        storeId
      }).populate({
        path: "orderItems",
        model: OrderItem,
        populate: {
          path: "productId",
          model: Product,
        },
      });
      return orders
}

export default giveOrderDetails;