// DB
import Category from "@/models/category.model";
import Billboard from "@/models/billboard.model";
import CategoryClient from "./components/CategoryClient";

// UI
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/ui/Heading";

import { CategoryColumn, columns } from "./components/columns";
import { format } from "date-fns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = await Category.find({
    storeId: params.storeId,
  }).populate("billboardId");

  //Simple Object Creation from categories fetch
  const categorieSimpleObject = JSON.parse(JSON.stringify(categories));

  const formattedcategories: CategoryColumn[] = categorieSimpleObject.map(
    (item: any) => ({
      id: item._id,
      name: item.name,
      billboardId: item.billboardId.label,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    })
  );

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedcategories} />
        <Separator />

        <DataTable
          searchKey="name"
          columns={columns}
          data={formattedcategories}
        />
        <Heading title="API's" description="API calls for Categories" />
        <Separator />
        <ApiList entityName="categories" entityIdName="categoryId" />
      </div>
    </div>
  );
};

export default CategoriesPage;
