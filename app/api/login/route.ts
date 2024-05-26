import executeSql from "@/app/util/database";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    if (data.username && data.password) {
      // TODO: 这里要生成一个token
      const { username, password } = data
      const res = await executeSql('SELECT * FROM user WHERE username = ? AND password = ?', [username, password])
      return Response.json({ data: res, msg: 'ok', status: 200 })
    }
  } catch (err) {
    return Response.json({ status: 500, msg: err })
  }
}