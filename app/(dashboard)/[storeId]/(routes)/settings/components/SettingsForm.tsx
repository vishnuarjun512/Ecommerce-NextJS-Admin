"use client";

import { StoreDocument } from "@/models/store.model";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";

interface SettingsFormProps {
  initialData: StoreDocument; // Use 'StoreDocument' here
}

const formSchema = z.object({
  storeName: z.string().min(1),
});

type SettingsFormValues = z.infer<typeof formSchema>;

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: SettingsFormValues) => {
    console.log(data);
    setLoading(true);
    try {
      const res = await axios.patch(`/api/stores/${params.storeId}`, data);
      router.refresh();
      router.push("/");
      toast.success("Store Updated");
    } catch (error: any) {
      toast.error("Update Error");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    setLoading(true);

    try {
      const res = await axios.delete(`/api/stores/${params.storeId}`);
      toast.success("Store Deleted");
      router.refresh();
      router.push("/");
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
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage store preferences" />
        <Button
          disabled={loading}
          variant="destructive"
          size="sm"
          onClick={() => {
            setOpen(true);
          }}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="storeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Store name"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Save changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.storeId}`}
        variant="public"
      />
    </>
  );
};
