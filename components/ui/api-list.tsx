"use client";

import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import React from "react";
import { ApiAlert } from "./api-alert";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

export const ApiList: React.FC<ApiListProps> = ({
  entityIdName,
  entityName,
}) => {
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/${params.storeId}`;
  return (
    <>
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}`}
        functionality={`To get all ${
          entityName.charAt(0).toUpperCase() + entityName.slice(1)
        }`}
      />
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        functionality={`To get a single ${
          entityName.charAt(0).toUpperCase() +
          entityName.slice(1, entityName.length - 1)
        }`}
      />
      <ApiAlert
        title="POST"
        variant="admin"
        description={`${baseUrl}/${entityName}/`}
        functionality={`To Create a ${
          entityName.charAt(0).toUpperCase() +
          entityName.slice(1, entityName.length - 1)
        }`}
      />
      <ApiAlert
        title="PATCH"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        functionality={`To Update a ${
          entityName.charAt(0).toUpperCase() +
          entityName.slice(1, entityName.length - 1)
        }`}
      />
      <ApiAlert
        title="DELETE"
        variant="public"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        functionality={`To Delete a ${
          entityName.charAt(0).toUpperCase() +
          entityName.slice(1, entityName.length - 1)
        }`}
      />
    </>
  );
};
