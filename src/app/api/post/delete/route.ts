import {NextRequest} from "next/server";
import {PrismaClient} from "@prisma/client";

export async function POST(request: NextRequest){
    // Get form data
    const formData = await request.formData()

    // Get data with form data
    const uuid = formData.get("uuid")

    // return status 400 if data not exist
    if (!uuid) return Response.json({}, {status: 400})

    // Prisma
    const prisma = new PrismaClient()

    // Get post if exist and return status 404 if not found
    const post = await prisma.post.findUnique({
        where: {
            uuid: uuid.toString()
        }
    })
    if (!post) return Response.json({}, {status: 404})

    // Delete post
    await prisma.post.delete({
        where: {
            uuid: post.uuid
        }
    })

    // Disconnect prisma
    prisma.$disconnect()

    // return status 200
    return Response.json({}, {status: 200})
}