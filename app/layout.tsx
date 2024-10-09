import NavBar from "@/app/NavBar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
        {/* </main> */}
      </body>
    </html>
  );
}
