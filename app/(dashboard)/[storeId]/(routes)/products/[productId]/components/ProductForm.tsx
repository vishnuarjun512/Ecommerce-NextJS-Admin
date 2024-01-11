"use client";

import { BillboardDocument } from "@/models/billboard.model";

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
  FormDescription,
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
import { ProductDocument } from "@/models/product.model";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  name: z.string().min(1),
  images: z
    .array(
      z.object({
        url: z.string().min(1).optional(), // Make url optional
      })
    )
    .optional(),
  price: z.number(),
  categoryId: z.string().min(1).optional(),
  isFeatured: z.boolean().default(false).optional(),
  isArchieved: z.boolean().default(false).optional(),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData: ProductDocument & {
    images: object[];
  };
  categories: CategoryDocument[];
  // Use 'BillboardDocument' here
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Product" : "Create Product";
  const description = initialData ? "Edit a Product" : "Add a new Product";
  const textMessage = initialData ? "Product updated" : "Product created";
  const actionMessage = initialData ? "Save changes" : "Create";

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      price: initialData?.price || 0,
      images: initialData?.images || [],
      isFeatured: initialData?.isFeatured || false,
      isArchieved: initialData?.isArchieved || false,
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    setLoading(true);
    try {
      if (initialData) {
        if (data.categoryId == undefined) {
          data.categoryId = initialData.categoryId;
        }
        await axios.patch(
          `/api/${params.storeId}/products/${params.productId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/products`, data);
      }
      toast.success(textMessage);
      router.push(`/${params.storeId}/products/`);
      router.refresh();
    } catch (error: any) {
      toast.error(`${initialData ? "Update" : "Creation"} Error -> `, error);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(
        `/api/${params.storeId}/products/${params.productId}`
      );
      router.refresh();
      toast.success("Product Deleted");
      router.push(`/${params.storeId}/products/`);
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
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value?.map((image) => image?.url ?? "") || []}
                    disabled={loading}
                    onChange={(url) => {
                      const updatedImages = field.value || [];
                      field.onChange([...updatedImages, { url }]);
                    }}
                    onRemove={(url) => {
                      const removingImages = field.value || [];
                      field.onChange([
                        ...removingImages?.filter(
                          (current) => current?.url !== url
                        ),
                      ]);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Product name"
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Product price"
                      disabled={loading}
                      type="number"
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    defaultValue={initialData ? initialData.categoryId : ""}
                    {...field}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((c, index) => (
                        <SelectItem key={index} value={c._id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start justify-center rounded-md border p-4 shadow">
                  <div className="flex flex-row items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Featured</FormLabel>
                  </div>
                  <div className="">
                    <FormDescription>
                      Product will be featured in Home page
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isArchieved"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start justify-center rounded-md border p-4 shadow">
                  <div className="flex flex-row items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Archieved</FormLabel>
                  </div>
                  <div className="">
                    <FormDescription>
                      Product will be hidden from Store
                    </FormDescription>
                  </div>
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

export default ProductForm;
