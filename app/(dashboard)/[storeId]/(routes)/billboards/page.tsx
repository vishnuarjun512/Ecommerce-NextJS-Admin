import Billboard from "@/models/billboard.model";
import BillboardClient from "./components/BillboardClient";

import { Separator } from "@/components/ui/separator";
import { BillboardColumn, columns } from "./components/columns";
import { format } from "date-fns";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/Heading";
import { ApiList } from "@/components/ui/api-list";

const Billboards = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await Billboard.find({
    storeId: params.storeId,
  });

  //Simple Object Creation from billboards fetch
  const billboardSimpleObject = JSON.parse(JSON.stringify(billboards));

  const formattedBillboards: BillboardColumn[] = billboardSimpleObject.map(
    (item: any) => ({
      id: item._id,
      label: item.label,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    })
  );

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
        <Separator />

        <DataTable
          searchKey="label"
          columns={columns}
          data={formattedBillboards}
        />
        <Heading title="API's" description="API calls for Billboards" />
        <Separator />
        <ApiList entityName="billboards" entityIdName="billboardId" />
      </div>
    </div>
  );
};

export default Billboards;
