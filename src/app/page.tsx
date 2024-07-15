import Image from "next/image";
import Header from "@/components/Header";
import {getServerSession} from "next-auth/next";
import {nextAuthConfig} from "@/app/api/auth/[...nextauth]/route";

export default async function Home() {
    const session = await getServerSession(nextAuthConfig)
  return (
    <div className={"flex flex-col h-screen"}>
        <Header/>
        <div className={"flex-1 flex justify-center items-center"}>
            <h1 className={"font-semibold text-[2vw]"}>La page est en développement {session?.user?.name}</h1>
        </div>
    </div>
  )
}
