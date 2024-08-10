/**
 * @Description 
 */
import { useEffect, useState } from "react";
import request from "@/app/util/request";
import { Card, Tooltip, message, Button } from 'antd';
import CopyToClipboard from 'react-copy-to-clipboard';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import styles from "./index.module.css";
const { Meta } = Card;

interface ImageGalleryProps {
  imageUrls: string[];
}
interface UrlObject {
  id?: number;
  url: string;
  description?: string; // 可选属性
}

const Display = () => {
  const [imageUrls, setImageUrls] = useState<UrlObject[]>([]);

  const handleCopy = (url: string) => {
    message.success(`已经复制到剪切板啦`);
  };
  // const handleShow = () => {
  //   console.log(555);
  //   request
  //     .get("api/getImageList", {
  //     }).then((res) => {

  //       if (res.status === 200) {
  //         console.log("res666", res.data.data);
  //         setImageUrls(res.data.data);

  //       }
  //     }).catch((err) => { console.log(err); });
  // };

  useEffect(() => {
    if (localStorage.getItem('user'))
      request
        .get("api/getImageList", {
        }).then((res) => {

          console.log("res666", res);
          if (res.data.status === 500) {
            message.error(`登录已过期！请重新登录~`);
            localStorage.removeItem("user");
            location.reload();
          }
          if (res.status === 200) {
            setImageUrls(res.data.data);

          }

        }).catch((err) => { console.log(err); });
  }, []);

  const handleDownload = (url: string) => {

    const link = document.createElement('a');
    link.href = url;
    link.download = 'ReDawn.jpg'; // 你可以自定义下载文件的名称
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div>
      <div className={styles.title} >我的图库</div>
      <PhotoProvider toolbarRender={({ index, images }) => {
        return (
          <>
            <CopyToClipboard text={images[index].src!} onCopy={() => handleCopy(images[index].src!)} key={index}>
              <Button>复制URL</Button>
            </CopyToClipboard >
            <Button onClick={() => handleDownload(images[index].src!)} style={{ marginLeft: '20px' }}>下载图片</Button>
          </>
        );
      }}>
        <div className={styles.foo}>
          {imageUrls?.slice(0, 10).map(({ url }, index) => (
            <PhotoView width={20} key={index} src={url}>
              <Tooltip title="Click to copy link" placement="top">
                <img className={styles.img} src={url} alt="" />
              </Tooltip>
            </PhotoView>
          ))}
        </div>
      </PhotoProvider >
    </div >
  );
};
export default Display;