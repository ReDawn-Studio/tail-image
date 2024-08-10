import { NextRequest, NextResponse } from "next/server";
import verifyToken from "@/app/util/token";
import executeSql from "@/app/util/database";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("tail-token");
    console.log("token", token);
    const decryptedToken = (await verifyToken(token?.value ?? "")) as Record<
      string,
      string | number
    >;
    if (!(decryptedToken && decryptedToken?.username)) {
      throw "upload failed, invalid token";
    }

    const res = await executeSql("SELECT url FROM images WHERE user_id = ?", [
      decryptedToken.id
    ]);

    return NextResponse.json({ status: 200, msg: 'ok', data: res });
  } catch (err) {
    return NextResponse.json({ status: 500, msg: err });
  }
}