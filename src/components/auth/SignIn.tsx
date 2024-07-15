import { MdOutlineAlternateEmail } from "react-icons/md";
import { PiPassword } from "react-icons/pi";
import {useRef} from "react";
import {signIn} from "next-auth/react";
import bcrypt from "bcrypt";

export default function SignIn() {
    const email = useRef<string | null>(null)
    const password = useRef<string | null>(null)

    const submitFormHandler = (e:any) => {
        if (!email.current || !password.current) return

        e.preventDefault();

        signIn("sign-in", {
            redirect: true,
            email: email.current,
            password: password.current
        }).catch(err => {
            console.error(err)
        })
    }

    return (
        <div className={"flex flex-col items-center justify-center w-full pt-[2vw] gap-y-[2vw]"}>
            <form className={"w-full flex flex-col gap-y-[1vw]"} onSubmit={submitFormHandler}>
                <div className={"flex flex-col gap-y-[0.5vw]"}>
                    <div className={"flex items-center px-[1vw] py-[0.8vw] border border-gray-200 rounded gap-x-[1vw]"}>
                        <span><MdOutlineAlternateEmail size={"1vw"}/></span>
                        <input type="email" required placeholder={"contact@example.com"} className={"flex-1 outline-0 text-[0.8vw]"} onChange={(e) => email.current = e.currentTarget.value}/>
                    </div>
                    <div className={"flex items-center px-[1vw] py-[0.8vw] border border-gray-200 rounded gap-x-[1vw]"}>
                        <span><PiPassword size={"1vw"}/></span>
                        <input type="password" required placeholder={"password"} className={"flex-1 outline-0 text-[0.8vw]"} onChange={(e) => password.current = e.currentTarget.value}/>
                    </div>
                </div>
                <input type={"submit"} className={"flex items-center justify-center px-[1vw] py-[0.8vw] bg-palette-green-5 rounded gap-x-[1vw] text-white text-[1vw] hover:bg-palette-green-6 duration-150"} value={"Continue"}/>
            </form>
            <div className={"relative w-full h-[0.2vw] bg-gray-400 flex items-center justify-center hover:bg-gray-200 duration-150 cursor-pointer"}>
                <p className={"absolute  text-gray-400 bg-white px-[1vw] hover:text-gray-200 duration-150 cursor-pointer text-[0.8vw]"}>Or Password Forgot</p>
            </div>
        </div>
    )
}