"use client";

import Heading from "@/components/ui/Heading";

import { OrderColumn } from "./columns";

interface ProductClientProps {
  data: OrderColumn[];
}

const OrderClient: React.FC<ProductClientProps> = ({ data }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Orders(${data?.length})`}
          description="Manage orders for the store"
        ></Heading>
      </div>
    </>
  );
};

export default OrderClient;
