import executeSql from "@/app/util/database";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const res = await executeSql('select * from user', []);
  return Response.json({ data: res, status: 200, msg: 'ok' });
}