import "./globals.css";
import ClientProviders from "./ClientProviders";

export const metadata = {
  title: "antimaksiat.co | Wear the Future",
  description: "A collective streetwear clothing brand. Wear the message, break the norm.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
