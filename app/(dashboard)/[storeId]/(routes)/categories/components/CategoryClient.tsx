"use client";

import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { CategoryColumn } from "./columns";
import { useParams, useRouter } from "next/navigation";

interface CategoryClientProps {
  data: CategoryColumn[];
}

const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories(${data?.length})`}
          description="Manage categories for the store"
        ></Heading>
        <Button
          onClick={() => {
            router.push(`/${params.storeId}/categories/undefined`);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>
    </>
  );
};

export default CategoryClient;
