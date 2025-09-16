export const metadata = {
  title: "CRM Contacts",
  description: "Exercise: debounced search"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial", margin: 0 }}>
        <div style={{ padding: "16px" }}>{children}</div>
      </body>
    </html>
  );
}