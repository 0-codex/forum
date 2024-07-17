import {NextRequest} from "next/server";
import {PrismaClient} from "@prisma/client";
import {IResponseUser} from "@/app/api/user/get/route";
import {IResponsePost} from "@/app/api/post/get/route";

export interface IResponsePage {
    title: string,
    authorUUID: string,
    uuid: string,
    posts: IResponsePost[],
    user: IResponseUser
}

export async function POST(request: NextRequest) {
    // Get form data
    const formData = await request.formData()

    // Get data with form data
    const uuid = formData.get("uuid")

    // return status 400 if data not exist
    if (!uuid) return Response.json({}, {status: 400})

    // Create prisma client
    const prisma = new PrismaClient()

    // Find page in database and return status 404 if page not found
    const page = await prisma.page.findUnique({
        where: {
            uuid: uuid.toString()
        }
    })
    if (!page) return Response.json({}, {status: 404})

    // Get all posts with pageId to page for get data
    const posts = await prisma.post.findMany({
        where: {
            pageUUID: page.uuid
        }
    })

    // Get user who created the page and return status 404 if not found
    const user = await prisma.user.findUnique({
        where: {
            uuid: page.authorUUID
        }
    })
    if (!user) return Response.json({}, {status: 404})

    // Disconnect prisma
    prisma.$disconnect()

    // return status 200 with data
    return Response.json({
        ...page,
        posts: posts,
        user: {
            email: user.email,
            uuid: user.uuid,
            phone: user.phone,
            admin: user.admin,
            username: user.username
        }
    } as IResponsePage, {status: 200})
}