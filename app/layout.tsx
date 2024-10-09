import NavBar from "@/app/NavBar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <NavBar />
        {children}
        {/* </main> */}
      </body>
    </html>
  );
}
