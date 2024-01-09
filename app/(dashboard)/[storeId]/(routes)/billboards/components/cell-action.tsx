"use client";

import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

import { BillboardColumn } from "./columns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/modals/alert-modal";
import { Copy, Delete, Edit, MoreHorizontal } from "lucide-react";
import toast from "react-hot-toast";

interface CellActionProps {
  data: BillboardColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Billboard Id copied to clipboard");
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);
      toast.success("Billboard Deleted");
      router.refresh();
      router.push(`/${params.storeId}/billboards/`);
    } catch (error: any) {
      console.log("Error deleting", error.message);
      toast.error("Delete Error", error.message);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        loading={loading}
        onConfirm={onDelete}
        onClose={() => {
          setOpen(false);
        }}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              router.push(`/${params.storeId}/billboards/${data.id}`);
            }}
          >
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
          >
            <Delete className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
