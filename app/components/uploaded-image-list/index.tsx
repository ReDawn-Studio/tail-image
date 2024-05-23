"use client";

import { UploadFile } from "antd";
import UploadedImage from "../uploaded-image";
import styles from "./index.module.css";

interface UploadedImageListProps {
  fileList: Array<UploadFile>;
  setFileList: (v: Array<UploadFile>) => void;
}

/* TODO: 拆分这个组件的意义在于，它需要实现：
  1. 懒加载以支撑较大数据量的渲染
  2. 搜索、图片大小排序等等（wait，排序这个和懒加载不会冲突吗
  3. 疑似重复的图片
*/
const UploadedImageList = (props: UploadedImageListProps) => {
  const { fileList, setFileList } = props;

  const handleRemoveItem = (uid: string) => {
    const filteredFileList = fileList.filter((file) => file.uid !== uid);
    setFileList([...filteredFileList]);
  };

  return (
    <div className={styles.modalContent}>
      {fileList.length > 0 ? (
        fileList.map((file, index) => {
          return (
            <UploadedImage
              file={file}
              handleRemove={() => handleRemoveItem(file.uid)}
              key={file.uid}
            ></UploadedImage>
          );
        })
      ) : (
        <h2 className={styles.text}>🎈 NO FILE UPLOADED 🎈</h2>
      )}
    </div>
  );
};

export default UploadedImageList;
