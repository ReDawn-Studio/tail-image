import { NextRequest } from "next/server";
import { Readable } from "stream";
import { Upload } from "@aws-sdk/lib-storage";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
export const config = {
  api: {
    bodyParser: false, // Disable body parsing, consume as stream
  },
};

// interface FTPConfig {
//   host: string;
//   user: string;
//   port: number;
//   password: string;
//   secure?: boolean; // 默认为false，可根据需要设置为true以使用TLS/SSL
// }

// const FTP_CONFIG: FTPConfig = {
//   host: "cn-sy1.rains3.com",
//   port: 8021,
//   user: "S44rW0aGBY1p8zIu",
//   password: "48VnWv6OJ2NeVQnKC4ozurlGYjwEPW",
//   secure: true,
// };

interface S3Config {
  endpoint: string;
  accessKey: string;
  secretKey: string;
}

const endpoint = process.env.END_POINT;
const secretAccessKey = process.env.SECRECT_ACCESS_KEY;
const accessKeyId = process.env.ACCESS_KEY_ID;
const Bucket = process.env.BUCKET;
const region = process.env.REGION;

type ResponseData = {
  message: string;
};

// const s3Client = new S3Client({});
export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return Response.json({ code: 400, msg: "No File Received" });
    }

    new Upload({
      client: new S3Client({
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
        region,
        endpoint,
      }),
      params: {
        ACL: "public-read",
        Bucket,
        Key: `test-username/${file.name}`,
        Body: file.stream(),
      },
      tags: [], // optional tags
      queueSize: 4, // optional concurrency configuration
      partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
      leavePartsOnError: false, // optional manually handle dropped parts
    })
      .done()
      .then((data) => {
        console.log("这里是什么", data);
      })
      .catch((err) => {
        console.log(err);
      });

    return Response.json({ code: 200, msg: "OK" });
  } catch (err) {
    return Response.json({ code: 500, msg: JSON.stringify(err) });
  }
}
