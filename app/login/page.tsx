'use client';
import styles from "./index.module.css";
import LoginBoard from "../components/login-board/index";
import { useState } from "react";
import { Button } from "antd";

const Login = () => {
  // TODO：我的想法是，正居中，因为这是最好适配移动端的写法了。
  const [isLogin, setIsLogin] = useState(true);

  const handleBoardChange = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* TODO：有点想做一个倒影效果 */}
      <div className={styles.boardWrapper}>
        {isLogin ? (
          <LoginBoard></LoginBoard>
        ) : (<div>register</div>)}
        <div className={styles.buttonWrapper}>
          <Button type="link" onClick={handleBoardChange}>
            {isLogin ? 'register' : 'login'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
