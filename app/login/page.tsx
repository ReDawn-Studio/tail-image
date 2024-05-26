"use client";
import styles from "./index.module.css";
import LoginBoard from "../components/login-board/index";
import { useState } from "react";
import { Button } from "antd";
import RegisterBoard from "../components/register-board";

enum BOARD_STATUS {
  LOGIN = 1,
  REGISTER = 2,
  HELP = 3,
}

const boardMap = {
  [BOARD_STATUS.LOGIN]: (props?: any) => <LoginBoard {...props}></LoginBoard>,
  [BOARD_STATUS.REGISTER]: (props?: any) => (
    <RegisterBoard {...props}></RegisterBoard>
  ),
  [BOARD_STATUS.HELP]: (props?: any) => <LoginBoard {...props}></LoginBoard>,
};

const textMap = {
  [BOARD_STATUS.LOGIN]: {
    title: "Tail Image Hosting 🦊",
  },
  [BOARD_STATUS.REGISTER]: {
    title: "A New User 🥳",
  },
  [BOARD_STATUS.HELP]: {
    title: "Need Any Help 🎈",
  },
};

const Login = () => {
  // TODO：我的想法是，正居中，因为这是最好适配移动端的写法了。
  const [boardStatus, setBoardStatus] = useState(BOARD_STATUS.LOGIN);

  const handleBoardChangeBetweenLoginAndRegister = () => {
    const target =
      boardStatus === BOARD_STATUS.LOGIN
        ? BOARD_STATUS.REGISTER
        : BOARD_STATUS.LOGIN;
    setBoardStatus(target);
  };

  return (
    <div className={styles.pageWrapper}>
      <h2 className={styles.title}>{textMap[boardStatus].title}</h2>
      <div className={styles.boardWrapper}>
        {boardMap[boardStatus]?.()}
        <div className={styles.buttonWrapper}>
          <Button
            type="link"
            onClick={handleBoardChangeBetweenLoginAndRegister}
          >
            {boardStatus === BOARD_STATUS.LOGIN ? "Sign Up" : "Sign In"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
