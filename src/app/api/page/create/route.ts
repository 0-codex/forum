import {NextRequest} from "next/server";
import {PrismaClient} from "@prisma/client";
import {IResponsePage} from "@/app/api/page/get/route";
import {v7 as uuid} from "uuid"

export async function POST(request: NextRequest) {
    // Get form data
    const formData = await request.formData()

    // Get data with form data
    const title = formData.get("title")
    const authorUUID = formData.get("authorUUID")

    // return status 400 if data not exist
    if (!title || !authorUUID) return Response.json({}, {status: 400})

    // Create prisma client
    const prisma = new PrismaClient()

    // Get user and return status 404 if user not found
    const user = await prisma.user.findUnique({
        where: {
            uuid: authorUUID.toString()
        }
    })
    if (!user) return Response.json({}, {status: 404})

    // Create page with data
    const newPage = await prisma.page.create({
        data: {
            title: title.toString(),
            authorUUID: authorUUID.toString(),
            uuid: uuid()
        }
    })

    // Disconnect prisma
    prisma.$disconnect()

    return Response.json({
        ...newPage,
        user: {
            email: user.email,
            uuid: user.uuid,
            phone: user.phone,
            admin: user.admin,
            username: user.username
        },
        posts: []
    } as IResponsePage, {status: 201})
}