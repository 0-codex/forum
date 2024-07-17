import { PrismaClient } from "@prisma/client";
import {NextRequest} from "next/server";

export async function POST(request: NextRequest) {
    // Get form data
    const formData = await request.formData()

    // Get data with form data
    const uuid = formData.get("uuid")

    // Return status 404 if data not exist
    if (!uuid) return Response.json({}, {status: 400})

    // Create prisma client
    const prisma = new PrismaClient()

    // Find page in database and return status 404 if not found
    const resultPage = await prisma.page.findUnique({
        where: {
            uuid: uuid.toString()
        }
    })
    if (!resultPage) return Response.json({}, {status: 404})

    // Delete all post with pageId of the page to delete
    await prisma.post.deleteMany({
        where: {
            pageUUID: resultPage.uuid
        }
    })

    // Delete page
    await prisma.page.delete({
        where: {
            uuid: uuid.toString()
        }
    })

    // Disconnect prisma
    prisma.$disconnect()

    // return status 200
   return Response.json({}, {status: 200})
}