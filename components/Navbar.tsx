import { UserButton, auth } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import MainNav from "@/components/MainNav";
import StoreSwitcher from "@/components/StoreSwitcher";
import Store from "@/models/store.model";
import { redirect } from "next/navigation";

const Navbar = async () => {
  var stores;

  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  stores = await Store.find({ userId });
  const newStores = JSON.parse(JSON.stringify(stores)); // Convert to simple object

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={newStores} />
        <MainNav className="bg-gray-200 p-2 rounded-lg ml-2" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
