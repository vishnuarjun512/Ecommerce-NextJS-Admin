import OrderClient from "./components/OrderClient";

import { Separator } from "@/components/ui/separator";
import { OrderColumn, columns } from "./components/columns";
import { format } from "date-fns";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/Heading";
import { ApiList } from "@/components/ui/api-list";
import { formatter } from "@/lib/utils";
import Order from "@/models/order.model";
import giveOrderDetails from "@/actions/giveOrderDetails";
import { ApiAlert } from "@/components/ui/api-alert";
import { getBaseUrl, useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import OrderApi from "./components/OrderApi";

const Orders = async ({ params }: { params: { storeId: string } }) => {
  const orders = await giveOrderDetails(params.storeId);

  //Simple Object Creation from orders fetch
  const orderSimpleObject = JSON.parse(JSON.stringify(orders));

  const formattedorders: OrderColumn[] = orderSimpleObject.map((item: any) => ({
    id: item._id,
    name: item.name,
    phone: item.phone,
    address: item.address,
    products: item.orderItems
      .map((orderItem: any) => orderItem.productId.name)
      .join(", "),
    totalPrice: formatter.format(
      item.orderItems.reduce(
        (totalPrice: number, orderItem: any) =>
          totalPrice + orderItem.productId.price,
        0
      )
    ),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedorders} />
        <Separator />
        <DataTable searchKey="phone" columns={columns} data={formattedorders} />
        <OrderApi />
      </div>
    </div>
  );
};

export default Orders;
