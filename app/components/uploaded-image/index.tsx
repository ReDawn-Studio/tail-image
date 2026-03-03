"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { UploadFile } from "../upload/types";

interface UploadedImageProps {
  file: UploadFile;
  handleRemove: () => void;
}

// TODO: 渲染海量数据之后，这个组件要做缓存，不然删除一个元素之后父级元素重绘导致子级元素全部重绘那个开销会很炸裂
const UploadedImage = (props: UploadedImageProps) => {
  const { file, handleRemove } = props;
  const [fileInfo, setFileInfo] = useState<{
    url: string;
    name: string;
    size: string;
  }>();

  const computeSizeWithUnit = (bytes: number) => {
    if (bytes === 0) return "";
    const baseNumber = 1024;
    const unitList = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const digit = Math.floor(Math.log(bytes) / Math.log(baseNumber));
    return (
      (bytes / Math.pow(baseNumber, digit)).toPrecision(3) +
      " " +
      unitList[digit]
    );
  };

  useEffect(() => {
    const fileObject = file.file;
    if (!(fileObject instanceof File)) return;
    const url = window.URL.createObjectURL(fileObject);
    const name = fileObject.name;
    const size = computeSizeWithUnit(fileObject.size);
    setFileInfo({ url, name, size });

    return () => {
      window.URL.revokeObjectURL(url);
    };
  }, [file]);

  return (
    <div className={styles.itemWrapper}>
      <div className={styles.itemInfo}>
        <div className={styles.previewImageWrapper}>
          <Image
            width={48}
            height={48}
            style={{ objectFit: "cover" }}
            className={styles.previewImage}
            src={fileInfo?.url || ""}
            alt={fileInfo?.name || ""}
          ></Image>
        </div>
        <div className={styles.textInfo}>
          <div className={styles.size}>{fileInfo?.size || ""}</div>
          <div className={styles.name}>{fileInfo?.name || ""}</div>
        </div>
      </div>

      <div className={styles.operations}>
        <Button
          onClick={handleRemove}
          variant="ghost"
          size="icon"
          className={styles.removeButton}
          type="button"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default UploadedImage;
