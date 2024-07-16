import { PrismaClient } from "@prisma/client";
import {NextRequest} from "next/server";

export default async function POST(request: NextRequest) {
    const formData = await request.formData()

    const id = formData.get("id")

    const title = formData.get("title")

    if (!id) return Response.json({}, {status: 400})

    const prisma = new PrismaClient()

    const resultPage = await prisma.page.findUnique({
        where: {
            id: parseInt(id.toString())
        }
    })
    if (!resultPage) return Response.json({}, {status: 404})

    const newData: {title?: string} = {}
    title && (newData.title = title.toString())

    const result = await prisma.page.update({
        where: {
            id: resultPage.id
        },
        data: newData
    })

    prisma.$disconnect()

    Response.json(result, {status: 200})
}