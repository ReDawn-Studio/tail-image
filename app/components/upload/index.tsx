"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button, message, Modal, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import styles from "./index.module.css";
import UploadedImageList from "../uploaded-image-list";
import request from "@/app/util/request";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const { Dragger } = Upload;
const maxFileSize = 1024 * 1024 * 3; // 3MB
const validatedFileTypeList = ["image/jpeg", "image/png"];



const Uploader = () => {
  const [fileList, setFileList] = useState<Array<UploadFile>>([]);
  const [uploading, setUploading] = useState(false);
  const [isModalShow, setIsModalShow] = useState(false);

  const fileListRef = useRef<Array<UploadFile>>([]); // 因为多文件上传的时候，批处理机制合并了几个任务，导致只有最后一个文件被有效上传
  const fileSizeSumRef = useRef(0);

  const [messageApi, contextHolder] = message.useMessage();

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("file", file as FileType);
    });
    setUploading(true);
    request
      .post("api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // 根据实际情况决定是否需要设置此头
        },
      })
      .then(() => {
        setFileList([]);
        message.success("upload successfully.");
      })
      .catch(() => {
        message.error("upload failed.");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const handlePreview = (e: MouseEvent) => {
    e.stopPropagation();
    setIsModalShow(true);
  };
  const handleFileListUpdate = (newFileList: Array<UploadFile>) => {
    fileListRef.current = newFileList;
    setFileList(newFileList);
  };

  const uploadProps: UploadProps = {
    multiple: true,
    beforeUpload: (file) => {
      // TODO: 未来还要检查总的存储空间是否足够
      if (fileSizeSumRef.current > maxFileSize) {
        messageApi.open({
          type: "error",
          content:
            "The total size of the files exceeds the maximum limit(3MB).",
        });
        return true;
      } else if (!validatedFileTypeList.includes(file.type)) {
        messageApi.open({
          type: "error",
          content: "The selected file type is not allowed.",
        });
        return true;
      } else {
        handleFileListUpdate([...fileListRef.current, file]);
        return false;
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    showUploadList: false,
    fileList,
  };


  return (
    <>
      {/* ant design 的全局提示所需要的： */}
      {contextHolder}
      <Modal
        footer={null}
        title={<h4>Pending Upload Images 🎈</h4>}
        open={isModalShow}
        onOk={() => {
          setIsModalShow(false);
        }}
        onCancel={() => {
          setIsModalShow(false);
        }}
      >
        <UploadedImageList
          fileList={fileList}
          setFileList={handleFileListUpdate}
        ></UploadedImageList>
      </Modal>
      <Dragger {...uploadProps}>
        <div className={styles.textWrapper}>
          {fileList.length > 0 ? (
            <div className={styles.uploadedImageWrapper}>
              <h2 className={styles.text}>✨ GOT {fileList.length} FILES ✨</h2>
              <p className={styles.text}>click to add files or preview</p>
              <Button
                onClick={handlePreview as any}
                disabled={fileList.length === 0}
                loading={uploading}
                className={styles.previewButton}
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
      </Dragger>
      <Button
        type="primary"
        size="large"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        className={styles.confirmButton}
      >
        {uploading ? "Uploading..." : "Confirm"}
      </Button>
    </>
  );
};

export default Uploader;
