import { NextRequest } from "next/server";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import verifyToken from "@/app/util/token";
export const config = {
  api: {
    bodyParser: false, // Disable body parsing, consume as stream
  },
};

const endpoint = process.env.END_POINT;
const secretAccessKey = process.env.SECRECT_ACCESS_KEY;
const accessKeyId = process.env.ACCESS_KEY_ID;
const bucket = process.env.BUCKET;
const region = process.env.REGION;

export async function POST(req: NextRequest) {
  const token = req.cookies.get("tail-token");
  const tokenCheckRes = await verifyToken(token?.value ?? "");
  console.log("tokenCheck", tokenCheckRes);
  try {
    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return Response.json({ code: 400, msg: "No File Received" });
    }

    const upload = new Upload({
      client: new S3Client({
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
        region,
        endpoint,
      } as unknown as S3Client),
      params: {
        ACL: "public-read",
        Bucket: bucket,
        Key: `test-username/${file.name}`,
        Body: file.stream(),
      },
      tags: [], // optional tags
      queueSize: 4, // optional concurrency configuration
      partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
      leavePartsOnError: false, // optional manually handle dropped parts
    });
    await upload.done();
    return Response.json({ code: 200, msg: "OK" });
  } catch (err) {
    return Response.json({ code: 500, msg: JSON.stringify(err) });
  }
}
