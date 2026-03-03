import type { Metadata } from "next";
import React from "react";
import { StoreProvider } from "./store/index";
import 'react-photo-view/dist/react-photo-view.css';
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "🦊尾巴图床 Tail Image Hosting",
  description: "免费的图床服务",
};

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <html lang="en">
      <body>
        <StoreProvider defaultValue={{ user: {} }}>
          {children}
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
};

export default RootLayout;
