import React from "react";
import ProductForm from "./components/ProductForm";
import Product from "@/models/product.model";
import Category from "@/models/category.model";

const productIdPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  let product;

  if (params.productId != "undefined") {
    // Fetch the product if productId is not "undefined"
    product = await Product.findOne({ _id: params.productId });
  }

  // Parse the product to a simple object
  const productSimpleObject = product
    ? JSON.parse(JSON.stringify(product))
    : null;

  //Get all categories for the Product
  const categories = await Category.find({
    storeId: params.storeId,
  });

  const categorySimpleObject = categories
    ? JSON.parse(JSON.stringify(categories))
    : null;

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          categories={categorySimpleObject}
          initialData={productSimpleObject}
        />
      </div>
    </div>
  );
};

export default productIdPage;
