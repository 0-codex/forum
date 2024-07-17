import {NextRequest} from "next/server";
import {PrismaClient} from "@prisma/client";
import {IResponseUser} from "@/app/api/user/get/route";

export interface IResponsePost {
    title: string,
    content: string,
    authorUUID: string,
    pageUUID: string,
    uuid: string,
    author: IResponseUser
}

export async function POST(request: NextRequest){
    // Get form data
    const formData = await request.formData()

    // Get data with form data
    const uuid = formData.get("uuid")

    // Return error if data not exist
    if (!uuid) return Response.json({}, {status: 400})

    // Prisma
    const prisma = new PrismaClient()

    // Get post with uuid and return status 404 if not found
    const post = await prisma.post.findUnique({
        where: {
            uuid: uuid.toString()
        }
    })
    if (!post) return Response.json({}, {status: 404})

    // Get user who created the post and return status 404 if not found
    const user = await prisma.user.findUnique({
        where: {
            uuid: post.authorUUID
        }
    })
    if (!user) return Response.json({}, {status: 404})

    // Disconnect prisma
    prisma.$disconnect()

    // return status 200
    return Response.json({
        ...post,
        author: {
            admin: user.admin,
            username: user.username,
            uuid: user.uuid,
            phone: user.phone,
            email: user.email
        }
    } as IResponsePost, {status: 200})
}