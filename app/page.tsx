import Image from "next/image";
import styles from "./page.module.css";
import Uploader from "./components/upload/index";


export default function Home() {
  return (
    <main className={styles.main}>

      <div className={styles.description}>
        <p>
          ✨ TAIL IMAGE HOSTING ✨
        </p>
        <div>
          AVATAR
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
        <h2>
          Get More Information By Clicking Here
        </h2>
      </a>
    </main>
  );
}
