import SessionAuthProvider from "@/context/SessionAuthProvider";
import "./globals.css";
import type { Metadata } from "next";
import * as Sentry from "@sentry/nextjs";

export const metadata: Metadata = {
  title: "HyperAgendados",
  description: "Agendamiento de citas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Sentry.ErrorBoundary
          fallback={({ error, resetError }) => (
            <div>
              <h2>Ocurrió un error!</h2>
              <p>{(error as Error).message}</p>
              <button onClick={() => resetError()}>Intentar de nuevo</button>
            </div>
          )}
        >
          <SessionAuthProvider>{children}</SessionAuthProvider>
        </Sentry.ErrorBoundary>
      </body>
    </html>
  );
}
