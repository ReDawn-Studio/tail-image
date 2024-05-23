"use client";

import { Button, UploadFile } from "antd";
import Image from "next/image";
import styles from "./index.module.css";
import { useEffect, useRef, useState } from "react";
import { CloseCircleOutlined } from "@ant-design/icons";

interface UploadedImageProps {
  file: UploadFile;
  handleRemove: () => void;
}

// TODO: 渲染海量数据之后，这个组件要做缓存，不然删除一个元素之后父级元素重绘导致子级元素全部重绘那个开销会很炸裂
const UploadedImage = (props: UploadedImageProps) => {
  const { file, handleRemove } = props;
  const urlRef = useRef("");
  const [fileInfo, setFileInfo] = useState<{
    url: string;
    name: string;
    size: string;
  }>();
  const [previewImageUrl, setPreviewImageUrl] = useState("");

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
    if (file instanceof File) {
      const url = window.URL.createObjectURL(file);
      // setPreviewImageUrl(url)
      const name = file.name;
      const size = computeSizeWithUnit(file.size);
      const fileInfo = {
        url,
        name,
        size,
      };
      setFileInfo(fileInfo);
    }
    return () => {
      if (fileInfo?.url) {
        window.URL.revokeObjectURL(fileInfo.url);
      }
    };
  }, [file]);

  return (
    <div className={styles.itemWrapper}>
      <div className={styles.itemInfo}>
        <div className={styles.previewImageWrapper}>
          <Image
            width={48}
            height={48}
            objectFit="cover"
            className={styles.previewImage}
            src={fileInfo?.url || ""}
            alt={file.name}
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
          type="link"
          danger
          icon={<CloseCircleOutlined />}
          size="large"
        />
      </div>
    </div>
  );
};

export default UploadedImage;
