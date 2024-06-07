import { verify } from "crypto";
import { NextResponse, NextRequest } from "next/server";
import verifyToken from "./app/util/token";
import jwt from "jsonwebtoken";
const pathWhiteList = ["/login"];

/* TODO: 
  由于 middleware 这里的运行时不支持 crpyto 模块，所以 jsonwebtoken 无法在这里完成解密验证——这个环节就放到每个接口里面实现了。
  那么这里中间件的意义就在于，ip封禁了。
*/
export const middleware = (request: NextRequest) => {
  const check = () => {
    const blockedIPs = ["CY"]; // 被禁止的IP列表
    try {
      // const p = await fetch("https://api.ipdatacloud.com/v2/query?key=cccc");
      // const d = await p.json();
      // if (blockedIPs.includes(d.data.location.country_code)) {
      //   console.log(2222);
      //   return NextResponse.json("Forbidden", {
      //     status: 403,
      //   });
      // } else {
      // return NextResponse.next();
      // const token = request.cookies.get("tail-token");
      // console.log("cookies", token);
      // const tokenKey = process.env.TOKEN_KEY as string;
      // jwt.verify(token?.value ?? "", tokenKey);
      // const tokenCheckRes = verifyToken(token?.value ?? "");
      // if (!token && !pathWhiteList.includes(request.nextUrl.pathname)) {
      //   console.log("invalid", request.nextUrl.pathname);
      //   return NextResponse.redirect(new URL("/login", request.url));
      // }
      return NextResponse.next();
    } catch (error) {
      console.log(error);
    }
  };

  return check();
};

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
