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

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    console.log('data', data)
    // TODO: 校验一下数据格式
    if (data.username && data.password) {
      const { username, password } = data;
      executeSql('INSERT INTO user (username, password, email) VALUES (?, ?, ?);', [username, password, '']);
    }
  } catch (err) {
    return Response.json({ status: 500, msg: err })
  }

  return Response.json({ status: 200, msg: 'ok' })
}