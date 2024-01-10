"use client";

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

import ImageUpload from "@/components/ui/image-upload";
import { CategoryDocument } from "@/models/category.model";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BillboardDocument } from "@/models/billboard.model";

const formSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
});

type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
  initialData: CategoryDocument;
  billboards: BillboardDocument[];
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  billboards,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Category" : "Create Category";
  const description = initialData ? "Edit a Category" : "Add a new Category";
  const textMessage = initialData ? "Category updated" : "Category created";
  const actionMessage = initialData ? "Save changes" : "Create";

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      billboardId: "",
    },
  });

  const onSubmit = async (data: CategoryFormValues) => {
    setLoading(true);
    try {
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/categories/${params.categoryId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/categories`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/categories/`);
      toast.success(textMessage);
    } catch (error: any) {
      toast.error(`${initialData ? "Update" : "Creation"} Error -> ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(
        `/api/${params.storeId}/categories/${params.categoryId}`
      );
      toast.success("Category Deleted");
      router.refresh();
      router.push(`/${params.storeId}/categories/`);
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
        <Heading title={title} description={description} />
        {initialData && (
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
        )}
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Category name"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a billboard" />
                        <SelectContent>
                          {billboards.map((b, index) => (
                            <SelectItem key={index} value={b._id}>
                              {b.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </SelectTrigger>
                    </FormControl>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {actionMessage}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};

export default CategoryForm;
