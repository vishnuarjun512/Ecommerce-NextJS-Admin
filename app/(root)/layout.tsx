import { connect } from "@/db/connection";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Store from "@/models/user.model";

connect();
export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect(`/sign-in`);
  }

  const store = await Store.findOne({ userId });

  if (store) {
    redirect(`/${store._id}`);
  }

  return <>{children}</>;
}
