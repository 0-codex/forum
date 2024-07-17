import {NextRequest} from "next/server";
import {PrismaClient} from "@prisma/client";
import {IResponsePost} from "@/app/api/post/get/route";
import {v7 as uuid} from "uuid"

export async function POST(request: NextRequest){
    // Get form data
    const formData = await request.formData()

    // Get data with form data
    const authorUUID = formData.get("authorUUID")
    const title = formData.get("title")
    const content = formData.get("content")
    const pageUUID = formData.get("pageUUID")

    // return status 400 if data not exist
    if (!authorUUID || !title || !content || !pageUUID) return Response.json({}, {status: 400})

    // Prisma
    const prisma = new PrismaClient()

    // Get if authorId exist and return status 404 if not found
    const user = await prisma.user.findUnique({
        where: {
            uuid: authorUUID.toString()
        }
    })
    if (!user) return Response.json({}, {status: 404})

    // Get if authorId exist and return status 404 if not found
    const page = await prisma.page.findUnique({
        where: {
            uuid: pageUUID.toString()
        }
    })
    if (!page) return Response.json({}, {status: 404})

    // Create post
    const post = await prisma.post.create({
        data: {
            authorUUID: authorUUID.toString(),
            title: title.toString(),
            content: content.toString(),
            uuid: uuid(),
            pageUUID: pageUUID.toString()
        }
    })

    // Disconnect prisma
    prisma.$disconnect()

    // return status 200
    return Response.json({
        ...post,
        author: {
            email: user.email,
            uuid: user.uuid,
            phone: user.phone,
            admin: user.admin,
            username: user.username
        }
    } as IResponsePost, {status: 200})
}