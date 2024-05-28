/*
id INT AUTO_INCREMENT, -- 或者使用SERIAL IF NOT PostgreSQL
    ->     username VARCHAR(255) NOT NULL,
    ->     password VARCHAR(255) NOT NULL, -- 实际中应使用CHAR长度固定存储哈希后的密码
    ->     registerTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- 或者NOW()等，根据数据库系统调整
    ->     email VARCHAR(255) UNIQUE NOT NULL, -- 假设邮箱需要唯一
    ->     PRIMARY KEY (id)
*/

import executeSql from "@/app/util/database";
import { NextRequest } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // TODO: 1.校验一下数据格式 2.通信过程中最好还是约定一个公钥，这样才能防止被中间人攻击
    if (data.username && data.password) {
      const { username, password } = data;
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      // 邮箱暂时不绑定
      const res = await executeSql(
        "INSERT INTO user (username, password, email) VALUES (?, ?, ?);",
        [username, hashedPassword, "0"]
      );
      return Response.json({ status: 200, msg: res });
    }
    return Response.json({ status: 500, msg: "failed" });
  } catch (err) {
    return Response.json({ status: 500, msg: err });
  }
}
