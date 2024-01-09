import Navbar from "@/components/Navbar";

import Store from "@/models/user.model";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Dashboard({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect(`/sign-in`);
  }

  const store = await Store.findOne({
    _id: params.storeId,
    userId,
  });

  if (store == null) {
    console.log("No More Stores");
    redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
