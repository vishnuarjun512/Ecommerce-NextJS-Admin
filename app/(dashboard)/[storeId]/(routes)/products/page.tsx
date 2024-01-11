import BillboardClient from "./components/BillboardClient";

import { Separator } from "@/components/ui/separator";
import { ProductColumn, columns } from "./components/columns";
import { format } from "date-fns";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/Heading";
import { ApiList } from "@/components/ui/api-list";
import Product from "@/models/product.model";
import { formatter } from "@/lib/utils";

const Billboards = async ({ params }: { params: { storeId: string } }) => {
  const products = await Product.find({
    storeId: params.storeId,
  }).populate("categoryId");

  //Simple Object Creation from products fetch
  const productSimpleObject = JSON.parse(JSON.stringify(products));

  const formattedproducts: ProductColumn[] = productSimpleObject.map(
    (item: any) => ({
      id: item._id,
      name: item.name,
      price: formatter.format(item.price),
      category: item.categoryId.name,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    })
  );

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedproducts} />
        <Separator />

        <DataTable
          searchKey="name"
          columns={columns}
          data={formattedproducts}
        />
        <Heading title="API's" description="API calls for Products" />
        <Separator />
        <ApiList entityName="products" entityIdName="productId" />
      </div>
    </div>
  );
};

export default Billboards;
