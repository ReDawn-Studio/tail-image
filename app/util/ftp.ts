// // app/utils/ftpClient.ts

// import ftp from "basic-ftp";

// interface FTPConfig {
//   host: string;
//   user: string;
//   port: number;
//   password: string;
//   secure?: boolean; // 默认为false，可根据需要设置为true以使用TLS/SSL
// }

// export class FTPClientWrapper {
//   private client: ftp.Client;

//   constructor(config: FTPConfig) {
//     this.client = new ftp();
//   }

//   async connect(): Promise<void> {
//     try {
//       await this.client.access({
//         host: this.config.host,
//         user: this.config.user,
//         password: this.config.password,
//         secure: this.config.secure || false,
//       });
//     } catch (error) {
//       console.error("FTP连接失败:", error);
//       throw error;
//     }
//   }

//   async uploadFile(filePath: string, content: Buffer): Promise<void> {
//     try {
//       await this.client.ensureDir("/");
//       await this.client.uploadFrom(content, filePath);
//       console.log(`${filePath} 上传成功`);
//     } catch (error) {
//       console.error("文件上传失败:", error);
//       throw error;
//     }
//   }

//   async disconnect(): Promise<void> {
//     try {
//       await this.client.end();
//       console.log("FTP连接已断开");
//     } catch (error) {
//       console.error("FTP断开连接时发生错误:", error);
//       throw error;
//     }
//   }
// }
