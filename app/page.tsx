"use client";
import Image from "next/image";
import Uploader from "./components/upload";
import { Avatar, message } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  const [_, contextHolder] = message.useMessage();

  // useEffect(() => {
  //   const handleUnauthorized = () => {
  //     router.push("/login");
  //   };

  //   document.addEventListener("tokenInvalidate", handleUnauthorized);
  //   return () => {
  //     document.removeEventListener("tokenInvalidate", handleUnauthorized);
  //   };
  // }, [router]);

  return (
    <main className={styles.main}>
      {contextHolder}
      <div className={styles.description}>
        <p>✨ TAIL IMAGE HOSTING ✨</p>
        <div>
          <Avatar size={64} icon={<UserOutlined />} />
        </div>
      </div>

      <div className={styles.center}>
        <Uploader></Uploader>
      </div>

      <a
        href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
        className={`${styles.card} ${styles.footer}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2>Get More Information By Clicking Here</h2>
      </a>
    </main>
  );
}
