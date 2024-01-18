import React from "react";
import { BillboardForm } from "./components/BillboardForm";
import Billboard from "@/models/billboard.model";

const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  var billboard;
  if (params.billboardId == "undefined") {
    billboard = null;
  } else {
    billboard = await Billboard.findOne({ _id: params.billboardId });
  }
  const billboardSimpleObject = JSON.parse(JSON.stringify(billboard));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboardSimpleObject} />
      </div>
    </div>
  );
};

export default BillboardPage;
