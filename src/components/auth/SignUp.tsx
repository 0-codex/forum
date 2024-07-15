import { MdOutlineAlternateEmail } from "react-icons/md";
import { PiPassword } from "react-icons/pi";
import { FaHashtag } from "react-icons/fa";
import {useRef} from "react";
import {signIn} from "next-auth/react";

export default function SignUp() {
    const username = useRef<string | null>(null)
    const email = useRef<string | null>(null)
    const password = useRef<string | null>(null)

    const submitFormHandler = (e:any) => {
        if (!username.current || !email.current || !password.current) return

        e.preventDefault();

        signIn("sign-up", {
            redirect: true,
            username: username.current,
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
                        <span><FaHashtag size={"1vw"}/></span>
                        <input type="text" placeholder={"username"} className={"flex-1 outline-0 text-[0.8vw]"} onChange={(e) => username.current = e.currentTarget.value}/>
                    </div>
                    <div className={"flex items-center px-[1vw] py-[0.8vw] border border-gray-200 rounded gap-x-[1vw]"}>
                        <span><MdOutlineAlternateEmail size={"1vw"}/></span>
                        <input type="email" placeholder={"contact@example.com"} className={"flex-1 outline-0 text-[0.8vw]"} onChange={(e) => email.current = e.currentTarget.value}/>
                    </div>
                    <div className={"flex items-center px-[1vw] py-[0.8vw] border border-gray-200 rounded gap-x-[1vw]"}>
                        <span><PiPassword size={"1vw"}/></span>
                        <input type="password" placeholder={"password"} className={"flex-1 outline-0 text-[0.8vw]"} onChange={(e) => password.current = e.currentTarget.value}/>
                    </div>
                </div>
                <input type={"submit"} className={"flex items-center justify-center px-[1vw] py-[0.8vw] bg-palette-green-5 rounded gap-x-[1vw] text-white text-[1vw] hover:bg-palette-green-6 duration-150"} value={"Continue"}/>
            </form>
        </div>
    )
}