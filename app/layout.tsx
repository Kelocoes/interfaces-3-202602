import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    title: { default: "Rutinas de ejercicio", template: "%s | Entrenamiento" },
    description: "Explora ejercicios, arma tus rutinas y marca lo que ya hiciste.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
    const theme = (await cookies()).get("theme")?.value === "icesi-dark" ? "icesi-dark" : "icesi";

    return (
        <html
            lang="es"
            data-theme={theme}
            className={`${poppins.className} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">{children}</body>
        </html>
    );
}