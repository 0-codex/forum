import {Prisma, PrismaClient} from "@prisma/client";
import {NextRequest} from "next/server";
import Type, {number} from "prop-types";
import TypeMap = Prisma.TypeMap;
import {Requireable} from "react";
import {FormDataEntryValue} from "undici-types";
import {IResponsePage} from "@/app/api/page/get/route";

export async function POST(request: NextRequest) {
    // Get form data
    const formData = await request.formData()

    // Get data with form data
    const uuid = formData.get("uuid")
    const title = formData.get("title")
    const authorUUID = formData.get("authorUUID")

    // return status 404 if data not exist
    if (!uuid) return Response.json({}, {status: 400})

    // Crete prisma client
    const prisma = new PrismaClient()

    // Find page with uuid and return status 404 if not found
    const page = await prisma.page.findUnique({
        where: {
            uuid: uuid.toString()
        }
    })
    if (!page) return Response.json({}, {status: 404})

    // Find user and return status 404 if not found
    const user = await prisma.user.findUnique({
        where: {
            uuid: authorUUID ? authorUUID.toString() : page.authorUUID
        }
    })
    if (!user) return Response.json({}, {status: 404})

    // Find posts and return status 404 if not found
    const posts = await prisma.post.findMany({
        where: {
            pageUUID: page.uuid
        }
    })

    // Insert new data in table
    const newData: {
        title?: string,
        authorUUID?: string
    } = {}
    title && (newData.title = title.toString())
    authorUUID && (newData.authorUUID = authorUUID.toString())

    // Update page with new data
    const newPage = await prisma.page.update({
        where: {
            uuid: page.uuid
        },
        data: newData
    })

    // Disconnect prisma
    prisma.$disconnect()

    // return status 200
    return Response.json({
        ...newPage,
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