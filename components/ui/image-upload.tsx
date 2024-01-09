"use client";
import { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";

import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }
  return (
    <div>
      <h1>Image Upload</h1>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => {
          return (
            <div
              className="relative w-[200px] h-[200px] overflow-hidden rounded-md"
              key={url}
            >
              <div className="z-10 absolute top-2 right-2">
                <Button
                  type="button"
                  onClick={() => {
                    onRemove(url);
                  }}
                  variant="destructive"
                  size="icon"
                >
                  <Trash className="w-4 h-4"></Trash>
                </Button>
              </div>
              <Image fill alt="Image" src={url} className="object-contain" />
            </div>
          );
        })}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="jiwqi93p">
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus className="w-4 h-4 mr-2" />
              Add Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
