import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false, // Disable body parsing, consume as stream
  },
};

type ResponseData = {
  message: string;
};

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  console.log("????", res);
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, (err: Error, fields, files) => {
      return Response.json({ code: 200, data: 1, msg: "OK" });
    });
  } catch (err) {
    return Response.json({ code: 500, data: 1, msg: err });
  }
}
