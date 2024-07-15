import Form from "@/components/auth/Form";
import {getServerSession} from "next-auth/next";
import {nextAuthConfig} from "@/app/api/auth/[...nextauth]/route";
import {Router} from "next/router";
import {redirect} from "next/navigation";

export default async function Auth() {
    const session = await getServerSession(nextAuthConfig)
    session && redirect("/")

    return (
        <div className={"w-screen h-screen flex"}>
            <div className={"flex-1 flex flex-col justify-between"}>
                <div className={"flex justify-center items-center py-[1vw]"}>
                    <h1 className={"cursor-default font-bold text-[1.5vw] bg-gradient-to-r from-palette-green-4 to-palette-green-7 bg-clip-text text-transparent"}>Forum</h1>
                </div>
                <Form/>
                <div></div>
            </div>
            <div className={"flex-1 bg-palette-green-5"}></div>
        </div>
    )
}