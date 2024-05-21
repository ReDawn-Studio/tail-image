'use client'
import React, { useState } from 'react';
import { Button, message, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import styles from './index.module.css'


type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const { Dragger } = Upload;

/*
  这里要有一个api/upload.ts处理上传逻辑，密钥存放在upload.ts文件中。
  原因；
    密钥需要放在服务端，但是antd组件貌似只能客户端渲染，那没办法了，只好再加一层。  
*/

// const props: UploadProps = {
//   name: 'file',
//   multiple: true,
//   action: '/api/upload',
//   onChange(info) {
//     const { status } = info.file;
//     if (status !== 'uploading') {
//       console.log(info.file, info.fileList);
//     }
//     if (status === 'done') {
//       message.success(`${info.file.name} file uploaded successfully.`);
//     } else if (status === 'error') {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
//   onDrop(e) {
//     console.log('Dropped files', e.dataTransfer.files);
//   },
// };


const Uploader: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    const formData = new FormData();
    // TODO: 这里后面改下，只能上传单张图片
    fileList.forEach((file) => {
      formData.append('file', file as FileType);
    });
    setUploading(true);
    fetch('api/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFileList([]);
        message.success('upload successfully.');
      })
      .catch(() => {
        message.error('upload failed.');
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
    fileList,
  };
  return (
    <>
      <Dragger {...props}>
        <div className={styles.textWrapper}>
          <h2 className={styles.text}>👉 UPLOAD 👈</h2>
          <p className={styles.text}>Click or Ddrag file to this area to upload</p>
          <p className={styles.text}>
            Support for a single upload.
          </p>
        </div>
      </Dragger>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
    </>
  )
};

export default Uploader;