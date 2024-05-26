import executeSql from "@/app/util/database"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  try {
    console.log('req', req)
    const res = executeSql('SELECT * FROM image WHERE userId = ?', [])
    return Response.json({ status: 200, msg: 'ok', data: res })
  } catch (err) {
    return Response.json({ status: 500, msg: err })
  }
}