/**
 * @Description 
 */
import { useEffect, useState } from "react";
import request from "@/app/util/request";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import CopyToClipboard from 'react-copy-to-clipboard';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import styles from "./index.module.css";
interface UrlObject {
  id?: number;
  url: string;
  description?: string; // 可选属性
}

const Display = () => {
  const [imageUrls, setImageUrls] = useState<UrlObject[]>([]);

  const handleCopy = (url: string) => {
    toast({ title: "复制成功", description: "已经复制到剪切板啦" });
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
            toast({
              title: "登录已过期",
              description: "请重新登录~",
              variant: "destructive",
            });
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
      {imageUrls && <PhotoProvider toolbarRender={({ index, images }) => {
        return (
          <>
            <CopyToClipboard text={images[index].src!} onCopy={() => handleCopy(images[index].src!)} key={index}>
              <Button>复制URL</Button>
            </CopyToClipboard >
            <Button onClick={() => handleDownload(images[index].src!)} className={styles.downloadButton}>下载图片</Button>
          </>
        );
      }}>
        <div className={styles.foo}>
          {imageUrls?.map(({ url }, index) => (
            <PhotoView width={20} key={index} src={url}>
              <img className={styles.img} src={url} alt="" title="Click to copy link" />
            </PhotoView>
          ))}
        </div>
      </PhotoProvider >}
      {
        imageUrls?.length === 0 && <div className={styles.noLogin}>
          <p> 空荡荡~ 👀</p>
          <div>快去登录上传吧! 🥳</div>

        </div>
      }
    </div >
  );
};
export default Display;
