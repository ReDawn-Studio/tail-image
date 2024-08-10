declare module 'react-copy-to-clipboard' {
  import * as React from 'react';

  interface CopyToClipboardProps {
    text: string;
    onCopy?: (text: string, result: boolean) => void;
    options?: {
      debug?: boolean;
      message?: string;
    };
    children: React.ReactNode;
  }

  class CopyToClipboard extends React.Component<CopyToClipboardProps> {}

  export default CopyToClipboard;
}

declare module 'basic-ftp' {
  // 声明 Client 类
  export class Client {
    // 构造函数声明
    constructor();

    // 实例方法声明
    access(options: any, callback?: (error: Error | null, client: Client) => void): Promise<Client>;
    connect(options: any): Promise<void>;
    disconnect(callback?: (error: Error | null) => void): Promise<void>;
    login(options: any, callback?: (error: Error | null, client: Client) => void): Promise<Client>;
    logout(callback?: (error: Error | null) => void): Promise<void>;
    list(path: string, callback?: (error: Error | null, entries: any[]) => void): Promise<any[]>;
    // ... 其他方法
  }
}