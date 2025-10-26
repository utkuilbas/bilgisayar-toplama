import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Bilgisayar Toplama Aracı",
    description: "Hayalinizdeki Bilgisayarı Hızlıca Toplayın!!",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="tr">
        <body className={`${inter.className} bg-gradient-to-br from-[#f6f7fb] to-[#e0e7ff] text-text-main min-h-screen`}>
        <div className="w-full min-h-screen flex flex-col items-center justify-start">
            <header className="w-full py-8 mb-4 shadow-none flex flex-col items-center bg-transparent">
                <h1 className="modern-title text-center text-4xl mb-2 tracking-tight">Bilgisayar Toplama Aracı</h1>
                <p className="modern-subtitle text-center text-base">Hayalinizdeki Bilgisayarı Hızlıca Toplayın!</p>
            </header>
            <main className="w-full flex-1 flex flex-col items-center justify-center">
                {children}
            </main>
        </div>
        </body>
        </html>
    );
}