import jwt from "jsonwebtoken";

/**
  仅限服务端使用
*/
const verifyToken = async (token: string) => {
  try {
    const tokenKey = process.env.TOKEN_KEY as string;
    return jwt.verify(token, tokenKey);
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default verifyToken;
