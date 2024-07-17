import {NextRequest} from "next/server";
import {PrismaClient} from "@prisma/client";
import {IResponsePost} from "@/app/api/post/get/route";

export async function POST(request: NextRequest){
    // Get form data
    const formData = await request.formData()

    // Get data with form data
    const uuid = formData.get("uuid")
    const authorUUID = formData.get("authorUUID")
    const title = formData.get("title")
    const content = formData.get("content")
    const pageUUID = formData.get("pageUUID")

    // Return status 400 if data not exist
    if (!uuid) return Response.json({}, {status: 400})

    // Prisma
    const prisma = new PrismaClient()

    // Find if post exist and return status 404 if not found
    const post = await prisma.post.findUnique({
        where: {
            uuid: uuid.toString()
        }
    })
    if (!post) return Response.json({}, {status: 404})

    // Get if page exist and return status 404 if not found
    const page = await prisma.page.findUnique({
        where: {
            uuid: pageUUID ? pageUUID.toString() : post.pageUUID
        }
    })
    if (!page) return Response.json({}, {status: 404})

    // Get if user exist and return status 404 if not found
    const user = await prisma.user.findUnique({
        where: {
            uuid: authorUUID ? authorUUID.toString() : post.authorUUID
        }
    })
    if (!user) return Response.json({}, {status: 404})

    // Set new data
    const newData: {
        title?: string,
        authorUUID?: string,
        content?: string,
        pageUUID?: string
    } = {}
    authorUUID && (newData.authorUUID = user.uuid)
    title && (newData.title = title.toString())
    content && (newData.content = content.toString())
    pageUUID && (newData.pageUUID = page.uuid)

    // Update post
    const updatePost = await prisma.post.update({
        where: {
            uuid: post.uuid
        },
        data: newData
    })

    // Disconnect prisma
    prisma.$disconnect()

    // return status 200
    return Response.json({
        ...updatePost,
        author: {
            email: user.email,
            uuid: user.uuid,
            phone: user.phone,
            admin: user.admin,
            username: user.username
        }
    } as IResponsePost, {status: 200})
}