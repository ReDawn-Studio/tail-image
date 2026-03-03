"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import styles from "./index.module.css";
import UploadedImageList from "../uploaded-image-list";
import request from "@/app/util/request";
import type { UploadFile } from "./types";
const maxFileSize = 1024 * 1024 * 3; // 3MB
const validatedFileTypeList = ["image/jpeg", "image/png"];

const Uploader = () => {
  const [fileList, setFileList] = useState<Array<UploadFile>>([]);
  const [uploading, setUploading] = useState(false);
  const [isModalShow, setIsModalShow] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const fileListRef = useRef<Array<UploadFile>>([]); // 因为多文件上传的时候，批处理机制合并了几个任务，导致只有最后一个文件被有效上传
  const fileSizeSumRef = useRef(0);

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("file[]", file.file);
    });
    setUploading(true);
    request
      .post("api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // 根据实际情况决定是否需要设置此头
        },
      })
      .then((res) => {
        console.log("res", res?.data);
        if (res.data?.code === 200) {
          setFileList([]);
          fileListRef.current = [];
          fileSizeSumRef.current = 0;
          toast({ title: "上传成功", description: "图片已上传到服务器。" });
        } else {
          toast({
            title: "上传失败",
            description: "服务器出大问题",
            variant: "destructive",
          });
        }
      })
      .catch((err) => {
        toast({
          title: "上传失败",
          description: "登录是必要的！",
          variant: "destructive",
        });
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const handlePreview = (event?: React.MouseEvent<HTMLButtonElement>) => {
    event?.stopPropagation();
    setIsModalShow(true);
  };
  const handleFileListUpdate = (newFileList: Array<UploadFile>) => {
    fileListRef.current = newFileList;
    fileSizeSumRef.current = newFileList.reduce(
      (sum, item) => sum + item.file.size,
      0
    );
    setFileList(newFileList);
  };

  const createUploadFile = (file: File): UploadFile => {
    const uid =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : String(Date.now() + Math.random());
    return { uid, file };
  };

  const addFiles = (files: FileList | File[]) => {
    const incoming = Array.from(files);
    let nextList = [...fileListRef.current];
    let currentSize = fileSizeSumRef.current;

    incoming.forEach((file) => {
      if (currentSize + file.size > maxFileSize) {
        toast({
          title: "文件过大",
          description: "文件总大小超过 3MB 限制。",
          variant: "destructive",
        });
        return;
      }
      if (!validatedFileTypeList.includes(file.type)) {
        toast({
          title: "文件类型不支持",
          description: "仅支持 JPG/PNG 格式。",
          variant: "destructive",
        });
        return;
      }
      nextList = [...nextList, createUploadFile(file)];
      currentSize += file.size;
    });

    handleFileListUpdate(nextList);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;
    addFiles(event.target.files);
    event.target.value = "";
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files?.length) {
      addFiles(event.dataTransfer.files);
    }
  };

  return (
    <>
      <Dialog open={isModalShow && !uploading} onOpenChange={setIsModalShow}>
        <DialogContent onClose={() => setIsModalShow(false)}>
          <DialogHeader>
            <DialogTitle>Pending Upload Images 🎈</DialogTitle>
          </DialogHeader>
          <UploadedImageList
            fileList={fileList}
            setFileList={handleFileListUpdate}
          />
        </DialogContent>
      </Dialog>

      <div
        className={`${styles.dropzone} ${isDragging ? styles.dragging : ""}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => event.preventDefault()}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png"
          className={styles.fileInput}
          onChange={handleInputChange}
        />
        <div className={styles.textWrapper}>
          {fileList.length > 0 ? (
            <div className={styles.uploadedImageWrapper}>
              <h2 className={styles.text}>✨ GOT {fileList.length} FILES ✨</h2>
              <p className={styles.text}>click to add files or preview</p>
              <Button
                variant="outline"
                onClick={handlePreview}
                disabled={fileList.length === 0 || uploading}
                className={styles.previewButton}
                type="button"
              >
                Preview
              </Button>
            </div>
          ) : (
            <div>
              <h2 className={styles.text}>👉 UPLOAD 👈</h2>
              <p className={styles.text}>
                click to select or drag file to this area to upload
              </p>
              <p className={styles.text}>support for a single upload.</p>
            </div>
          )}
        </div>
      </div>
      <Button
        size="lg"
        onClick={handleUpload}
        disabled={fileList.length === 0 || uploading}
        className={styles.confirmButton}
        type="button"
      >
        {uploading ? "Uploading..." : "Confirm"}
      </Button>
    </>
  );
};

export default Uploader;
