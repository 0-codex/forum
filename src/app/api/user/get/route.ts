import { PrismaClient } from "@prisma/client";
import {NextRequest} from "next/server";

export interface IResponseUser {
    email: string,
    admin: boolean,
    phone: string,
    username: string,
    uuid: string
}

export async function POST(request: Request){
    // Get form data
    const formData = await request.formData()

    // Get data with form data
    const uuid = formData.get("uuid")

    // return status 400 if data not exist
    if(!uuid) return Response.json({}, {status: 400})

    // Create prisma client
    const prisma = new PrismaClient()

    // Find user and return status 404 if not found
    const user = await prisma.user.findUnique({
        where: {
            uuid: uuid.toString()
        }
    })
    if (!user) return Response.json({}, {status: 404})

    // Disconnect prisma
    prisma.$disconnect()

    // return status 200
    return Response.json({
        uuid: user.uuid,
        phone: user.phone,
        email: user.email,
        admin: user.admin,
        username: user.username
    } as IResponseUser, {status: 200})
}