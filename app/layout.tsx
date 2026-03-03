import type { Metadata } from "next";
import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { StoreProvider } from "./store/index";
import 'react-photo-view/dist/react-photo-view.css';
import "./globals.css";

export const metadata: Metadata = {
  title: "🦊尾巴图床 Tail Image Hosting",
  description: "免费的图床服务",
};

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <StoreProvider defaultValue={{ user: {} }}>{children}</StoreProvider>
        </AntdRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
