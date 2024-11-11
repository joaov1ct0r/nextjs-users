import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/components/header";
import Container from "@/app/components/container";
import Providers from "@/app/providers";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";
import Loading from "@/app/components/loading";

export const metadata: Metadata = {
  title: "App",
  description: "App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`sans-serif antialiased`}>
        <Providers>
          <Container>
            <Header />
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </Container>
        </Providers>
      </body>
    </html>
  );
}
