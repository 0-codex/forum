'use client'

import SignIn from "@/components/auth/SignIn";
import SignUp from "@/components/auth/SignUp";
import {useState} from "react";
import {useSearchParams} from "next/navigation";

export enum EAuthPage {
    SignIn,
    SignUp
}

export default function Form() {
    const searchParams = useSearchParams()
    const pageState = searchParams.get("type") ? (searchParams.get("type") == "signup" ? EAuthPage.SignUp : EAuthPage.SignIn) : EAuthPage.SignIn

    const [page, setPage] = useState<EAuthPage>(pageState)

    const changePageHandler = (newPage: EAuthPage) => {
        if (page == newPage) return

        const selectPageAnim = document.getElementById("auth-selectPageAnim")
        if (!selectPageAnim) return

        if (newPage == EAuthPage.SignIn) {
            selectPageAnim.animate([
                {
                    left: "50%",
                },
                {
                    left: "0%",
                }
            ], {
                duration: 100,
                fill: "forwards",
                easing: "ease-in-out"
            })

            setPage(newPage)
        } else if (newPage == EAuthPage.SignUp) {
            selectPageAnim.animate([
                {
                    left: "0%",
                },
                {
                    left: "50%",
                }
            ], {
                duration: 100,
                fill: "forwards"
            })

            setPage(newPage)
        }
    }

    return (
        <div className={"flex flex-col justify-center items-center px-[15vw] gap-y-[1vw]"}>
            <h1 className={"font-semibold text-[2.5vw]"}>Welcome Back</h1>
            <div className={"relative flex bg-gray-200 rounded-[0.8vw] w-full py-[0.9vw]"}>
                <div className={"z-10 absolute w-full h-full rounded-[0.8vw] top-0 p-[0.3vw]"}>
                    <div id={"auth-selectPageAnim"}
                         className={"relative w-[50%] bg-white h-full rounded-[0.8vw] py-[0.5vw]"}
                         style={page == EAuthPage.SignUp ? {left: "50%"} : {}}></div>
                </div>
                <button className={"flex-1 z-20 text-[0.8vw] font-semibold"}
                        onClick={() => changePageHandler(EAuthPage.SignIn)}>Sign In
                </button>
                <button className={"flex-1 z-20 text-[0.8vw] font-semibold"}
                        onClick={() => changePageHandler(EAuthPage.SignUp)}>Sign Up
                </button>
            </div>
            <>
                {page == EAuthPage.SignIn && <SignIn/>}
                {page == EAuthPage.SignUp && <SignUp/>}
            </>
        </div>
    )
}