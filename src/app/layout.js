import "./globals.css";

export const metadata = {
  title: "antimaksiat.co | Wear the Future",
  description: "A collective streetwear clothing brand. Wear the message, break the norm.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
