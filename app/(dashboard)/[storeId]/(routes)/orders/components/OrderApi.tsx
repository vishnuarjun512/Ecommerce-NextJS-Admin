"use client";
import Heading from "@/components/ui/Heading";
import { ApiAlert } from "@/components/ui/api-alert";
import { Separator } from "@/components/ui/separator";
import { useOrigin } from "@/hooks/use-origin";
import React from "react";

const OrderApi = () => {
  const baseUrl = useOrigin();

  return (
    <div className="p-2 flex flex-col gap-2">
      <Heading title="API's" description="API calls for Orders" />
      <Separator />

      <div className="pt-2 flex flex-col gap-2">
        <ApiAlert
          description={`${baseUrl}/api/checkout`}
          variant="public"
          title="POST"
          functionality="For General checkout"
        />
        <ApiAlert
          description={`${baseUrl}/api/webhook`}
          variant="public"
          title="POST"
          functionality="For Payment Webhook"
        />
      </div>
    </div>
  );
};

export default OrderApi;
