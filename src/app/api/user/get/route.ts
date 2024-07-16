import { PrismaClient } from "@prisma/client";
import {NextRequest} from "next/server";

export interface IUser {
    email: string,
    id: number,
    name: string
}

export async function POST(request: Request){
    const formData = await request.formData()
    const id = formData.get("id")

    if(!id) return Response.json({}, {status: 400})
    if(!parseInt(id.toString())) return Response.json({}, {status: 400})

    const prisma = new PrismaClient()

    const result = await prisma.user.findUnique({
        where: {
            id: parseInt(id.toString())
        }
    })

    prisma.$disconnect()

    if (!result) return Response.json({}, {status: 404})

    return Response.json({
        id: result.id,
        email: result.email,
        name: result.name
    } as IUser, {status: 200})
}