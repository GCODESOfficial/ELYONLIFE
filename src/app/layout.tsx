import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata: Metadata = {
  title: "Elyon Life Ministry",
  description:
    "A place to worship, grow, and experience God's transforming love in community.",
  openGraph: {
    title: "Elyon Life Ministry",
    description:
      "A place to worship, grow, and experience God's transforming love in community.",
    url: "https://www.elyonlifeministry.org/images/hero-desktop.png",
    siteName: "Elyon Life Ministry",
    images: [
      {
        url: "/images/hero-desktop.png",
        width: 1200,
        height: 630,
        alt: "Elyon Life Ministry Hero Image",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elyon Life Ministry",
    description:
      "A place to worship, grow, and experience God's transforming love in community.",
    images: ["https://www.elyonlifeministry.org/images/hero-desktop.png"],
    site: "@elyonlifeministry",
    creator: "@elyonlifeministry",
  },
  metadataBase: new URL("https://www.elyonlifeministry.org"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
