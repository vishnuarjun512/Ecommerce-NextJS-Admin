import Store from "@/models/user.model";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { SettingsForm } from "./components/SettingsForm";
interface SettingsPageProps {
  params: {
    storeId: string;
  };
}
const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const store = await Store.findOne({ _id: params.storeId });
  if (!store) {
    redirect("/");
  }

  const simpleObjectStore = JSON.parse(JSON.stringify(store));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={simpleObjectStore} />
      </div>
    </div>
  );
};

export default SettingsPage;
