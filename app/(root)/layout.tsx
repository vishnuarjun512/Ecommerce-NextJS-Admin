import { connect } from "@/db/connection";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Store from "@/models/store.model";

connect();
export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    return redirect(`/sign-in`);
  }

  const store = await Store.findOne({ userId });

  if (store !== null) {
    redirect(`/${store?._id!}`);
  }

  return <>{children}</>;
}
