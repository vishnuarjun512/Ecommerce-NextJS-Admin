"use client";

import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { ProductColumn } from "./columns";
import { useParams, useRouter } from "next/navigation";

interface ProductClientProps {
  data: ProductColumn[];
}

const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Product(${data?.length})`}
          description="Manage products for the store"
        ></Heading>
        <Button
          onClick={() => {
            router.push(`/${params.storeId}/products/undefined`);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>
    </>
  );
};

export default ProductClient;
