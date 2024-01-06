import prismadb from "@/lib/prismadb";
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
  const userId = auth();

  if (!userId) {
    redirect(`/sign-in`);
  }
  console.log("params:", params); // Add this line for debugging
  console.log("userId:", userId); // Add this line for debugging

  try {
    const store = await Store.findOne({
      _id: params.storeId,
      userId: userId.userId,
    });

    if (!store) {
      redirect("/");
    }
  } catch (error: any) {
    console.log(error.message);
  }

  return (
    <>
      <div>This will be Navbar</div>
      {children}
    </>
  );
}
