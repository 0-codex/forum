import type {Metadata} from "next";
import "./globals.css";
import {getSession, SessionProvider} from "next-auth/react";
import {getServerSession} from "next-auth/next";
import {nextAuthConfig} from "@/app/api/auth/[...nextauth]/route";
import Session from "@/components/Session";

export const metadata: Metadata = {
    title: "Forum",
};

export default async function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession(nextAuthConfig)

    return (
        <html lang="fr">
            <body>
                <Session>
                    {children}
                </Session>
            </body>
        </html>
    );
}
