import executeSql from "@/app/util/database";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { QueryResult } from "mysql2";

interface LoginRes {
  id: number;
  username: string;
  password: string;
  email: string;
}

export async function POST(req: NextRequest) {
  try {
    const requestParam = await req.json();
    if (requestParam.username && requestParam.password) {
      const testDemo = await executeSql("SELECT * FROM user", []);
      const res = (await executeSql("SELECT * FROM user WHERE username = ?", [
        requestParam.username,
      ])) as QueryResult as Array<LoginRes>;
      const queryResult = res?.[0];

      const isMatch = await bcryptjs.compare(
        requestParam.password,
        queryResult?.password ?? ""
      );

      if (isMatch) {
        const tokenData = {
          id: queryResult.id,
          username: queryResult.username,
        };
        const tokenKey = process.env.TOKEN_KEY as string;
        const token = jwt.sign(tokenData, tokenKey, {
          expiresIn: "1d",
        });

        const userInfo = {
          email: queryResult.email,
          username: queryResult.username,
        };

        // token 直接传给前端存 localStorage，免得再从 cookie 读取一次
        const response = NextResponse.json({
          data: { token, userInfo },
          msg: "ok",
          status: 200,
        });
        response.cookies.set("token", token, { httpOnly: true });
        return response;
      } else {
        return NextResponse.json({
          msg: "username or password is wrong",
          status: 500,
        });
      }
    }
  } catch (err) {
    return Response.json({ status: 500, msg: JSON.stringify(err) });
  }
}
