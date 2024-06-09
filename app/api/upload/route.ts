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

// TODO: 不能这么存储图片，会有覆盖问题。。。
export async function POST(req: NextRequest) {
  const token = req.cookies.get("tail-token");
  const decryptedToken = (await verifyToken(token?.value ?? "")) as Record<
    string,
    string | number
  >;
  if (!(decryptedToken && decryptedToken?.username)) {
    throw "upload failed, invalid token";
  }

  // TODO: 如果校验不通过，取消请求
  try {
    const data = await req.formData();
    const fileList = data.getAll("file[]") as Array<File>;
    console.log("可能有多张图片", fileList);

    if (!fileList?.length) {
      return Response.json({ code: 400, msg: "No File Received" });
    }

    const client = new S3Client({
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      region,
      endpoint,
    } as unknown as S3Client);

    for (const file of fileList) {
      const upload = new Upload({
        client,
        params: {
          ACL: "public-read",
          Bucket: bucket,
          Key: `${decryptedToken.username}/${Date.now()}-${file.name}`,
          Body: file.stream(),
        },
        tags: [], // optional tags
        queueSize: 4, // optional concurrency configuration
        partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
        leavePartsOnError: false, // optional manually handle dropped parts
      });
      await upload.done();
    }

    return Response.json({ code: 200, msg: "OK" });
  } catch (err) {
    return Response.json({ code: 500, msg: JSON.stringify(err) });
  }
}
