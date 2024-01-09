"use client";

import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { BillboardColumn } from "./columns";
import { useParams, useRouter } from "next/navigation";

interface BillboardClientProps {
  data: BillboardColumn[];
}

const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards(${data?.length})`}
          description="Manage billboards for the store"
        ></Heading>
        <Button
          onClick={() => {
            router.push(`/${params.storeId}/billboards/undefined`);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>
    </>
  );
};

export default BillboardClient;
