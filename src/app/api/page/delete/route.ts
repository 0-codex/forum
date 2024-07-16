import { PrismaClient } from "@prisma/client";
import {NextRequest} from "next/server";

export async function POST(request: NextRequest) {
    const formData = await request.formData()

    const id = formData.get("id")

    if (!id) return Response.json({}, {status: 404})

    const prisma = new PrismaClient()

    const resultPage = await prisma.page.findUnique({
        where: {
            id: parseInt(id.toString())
        }
    })

    if (!resultPage) return Response.json({}, {status: 404})

    await prisma.post.deleteMany({
        where: {
            pageId: resultPage.id
        }
    })

    await prisma.page.delete({
        where: {
            id: parseInt(id.toString())
        }
    })

    prisma.$disconnect()

   return Response.json({}, {status: 200})
}