'use client'
import Image from "next/image";
import Header from "@/components/Header";
import {getServerSession} from "next-auth/next";
import {nextAuthConfig} from "@/app/api/auth/[...nextauth]/route";
import {useSession} from "next-auth/react";

export default function Home() {
    const session = useSession()

    return (
        <div className={"flex flex-col h-screen"}>
            <Header/>
            <div className={"flex-1 flex justify-center items-center"}>
                <h1 className={"font-semibold text-[2vw]"}>La page est en développement</h1>
                <button onClick={() => console.log(session)}>get session</button>
            </div>
        </div>
    )
}
