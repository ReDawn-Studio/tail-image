"use client";
import Image from "next/image";
import Uploader from "./components/upload";
import Display from "./components/display";
import { Button } from "@/components/ui/button";
import { useStore } from "@/app/store";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import 'react-photo-view/dist/react-photo-view.css';


export default function Home() {
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

  const router = useRouter();
  const handleUserInfo = () => {
    if (localUerInfo != null) return;
    router.push("/login");
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>✨ 尾巴图床 ✨</p>
        <div className={styles.userInfo} onClick={handleUserInfo}>
          <div className={styles.avatar}>
            {userInfo.avatar ? (
              <img src={"https://tosuke.top/avater/" + userInfo.avatar} alt={userInfo.username} className={styles.avatarImage} />
            ) : (
              <div className={styles.avatarPlaceholder}>
                <span>{userInfo.username?.charAt(0)?.toUpperCase() || 'U'}</span>
              </div>
            )}
          </div>
          <div className={styles.userInfoText}>
            <p className={styles.username}>{userInfo.username}</p>
            {localUerInfo == null && (
              <p className={styles.loginHint}>点击登录</p>
            )}
          </div>
        </div>
      </div>

      <div className={styles.center}>
        <Uploader></Uploader>
        <Display></Display>
      </div>

      <a
        href="https://tosuke.top/"
        className={`${styles.card} ${styles.footer}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2>点 击 这 里 来 了 解 更 多！</h2>
      </a>
    </main>
  );
}
