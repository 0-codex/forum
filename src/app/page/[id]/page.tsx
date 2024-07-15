export default function Page({params}: {params: {id: string}}) {
    return (
        <div className={"w-screen h-screen flex justify-center items-center"}>
            {params.id}
        </div>
    )
}