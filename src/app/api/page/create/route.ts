import {NextRequest} from "next/server";
import {PrismaClient} from "@prisma/client";

export async function POST(request: NextRequest) {
    const formData = await request.formData()

    const title = formData.get("title")
    const userId = formData.get("userId")

    if (!title || !userId) return Response.json({}, {status: 400})

    const prisma = new PrismaClient()

    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(userId.toString())
        }
    })

    if (!user) return Response.json({}, {status: 404})

    const resultCreate = await prisma.page.create({
        data: {
            title: title.toString(),
            userId: parseInt(userId.toString()),
        }
    })

    prisma.$disconnect()

    return Response.json({
        ...resultCreate,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        },
        posts: []
    }, {status: 201})
}