import React from "react";
import CategoryForm from "./components/CategoryForm";
import Billboard from "@/models/billboard.model";
import Category from "@/models/category.model";

const CategoryIdPage = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  console.log(params.categoryId);
  var category;
  if (params.categoryId == "undefined") {
    category = null;
  } else {
    category = await Category.findOne({ _id: params.categoryId });
  }
  const categorySimpleObject = JSON.parse(JSON.stringify(category));

  const billboards = await Billboard.find({
    storeId: params.storeId,
  });

  const billboardSimpleObject = JSON.parse(JSON.stringify(billboards));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm
          billboards={billboards}
          initialData={categorySimpleObject}
        />
      </div>
    </div>
  );
};

export default CategoryIdPage;
