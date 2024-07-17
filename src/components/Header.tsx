'use client'

import {getServerSession} from "next-auth/next";
import {nextAuthConfig} from "@/app/api/auth/[...nextauth]/route";
import {useSession} from "next-auth/react";

export default function Header() {
    const session = useSession()

    return (
        <div className={"flex justify-between items-center px-[10vw] py-[2vw]"}>
            <div>
                <h1 className={"cursor-default font-bold text-[1.5vw] bg-gradient-to-r from-palette-green-4 to-palette-green-7 bg-clip-text text-transparent"}>Forum</h1>
            </div>
            <div></div>
            <div className={"flex gap-x-[0.5vw]"}>
                {
                    session.status == "authenticated" ? (
                        <>
                            <a className={"bg-palette-green-5 px-[1.5vw] py-[0.5vw] rounded font-semibold text-[0.8vw] hover:bg-palette-green-6 duration-150"}
                               href={"/api/auth/signout"}>Se Déconnecter</a>
                        </>
                    ) : (
                        <>
                            <a className={"bg-palette-green-5 px-[1.5vw] py-[0.5vw] rounded font-semibold text-[0.8vw] hover:bg-palette-green-6 duration-150"}
                               href={"/auth?type=signin"}>Se connecter</a>
                            <a className={"px-[1.5vw] py-[0.5vw] rounded border-[0.15vw] border-palette-green-6 font-semibold text-[0.8vw] hover:bg-gray-100 duration-150"}
                               href={"/auth?type=signup"}>S'inscrire</a>
                        </>
                    )
                }
            </div>
        </div>
    )
}