import {redirect} from "next/navigation";
import {IPage} from "@/app/api/page/get/route";

export default async function Page({params}: {params: {id: string}}) {
    const page = await fetch(`http://localhost:3000/api/page?id=${params.id}`, {
        method: "GET"
    })

    if (!page.ok) redirect("/")

    const result: IPage = await page.json()

    return (
        <div className={"w-screen h-screen flex justify-center items-center"}>
            {}
        </div>
    )
}