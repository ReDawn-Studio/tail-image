"use client";
import Image from "next/image";
import Uploader from "./components/upload";
import Display from "./components/display";
import { Avatar, message, Statistic, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useStore } from "@/app/store";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import 'react-photo-view/dist/react-photo-view.css';


export default function Home() {
  const [_, contextHolder] = message.useMessage();
  const store = useStore();
  let userInfo: any = store.user.userInfo;
  const [localUerInfo, setLocalUerInfo] = useState(null);
  useEffect(() => {
    setLocalUerInfo(localStorage.getItem('user') as any);
  }, []);

  if (localUerInfo != null) {
    userInfo = JSON.parse(localUerInfo);
  } else {
    userInfo.username = '登录';
  }
  console.log("https://tosuke.top/avater/" + userInfo.avatar);
  // useEffect(() => {
  //   const handleUnauthorized = () => {
  //     router.push("/login");
  //   };

  //   document.addEventListener("tokenInvalidate", handleUnauthorized);
  //   return () => {
  //     document.removeEventListener("tokenInvalidate", handleUnauthorized);
  //   };
  // }, [router]);
  const router = useRouter();
  const handleUserInfo = () => {
    if (localUerInfo != null) return;
    router.push("/login");
  };

  return (
    <main className={styles.main}>
      {contextHolder}
      <div className={styles.description}>
        <p>✨ 尾巴图床 ✨</p>
        <div className={styles.userInfo} onClick={handleUserInfo}>
          <Avatar size={64} icon={<UserOutlined />} src={"https://tosuke.top/avater/" + userInfo.avatar} /><Statistic title="Know as" value={userInfo.username} />
        </div>
      </div>

      <div className={styles.center}>
        <Uploader></Uploader>
        <Display></Display>
      </div>

      <a
        href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
        className={`${styles.card} ${styles.footer}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2>点 击 这 里 来 了 解 更 多！</h2>
      </a>
    </main>
  );
}
