import {PrismaClient} from "@prisma/client";
import {IResponseUser} from "@/app/api/user/get/route";
import bcrypt from "bcrypt";
import {v7 as uuid} from "uuid"

export async function POST(request: Request){
    // Get form data
    const formData = await request.formData()

    // Get data with form data
    const email = formData.get("email")
    const username = formData.get("username")
    const phone = formData.get("phone")
    const password = formData.get("password")
    const admin = formData.get("admin")

    // return status 400 if data not exist
    if(!email || !username || !phone || !password || !admin) return Response.json({}, {status: 400})

    // verify data
    if (admin && !parseInt(admin.toString())) Response.json({}, {status: 400})

    // Create prisma client
    const prisma = new PrismaClient()

    // Find user and return status 404 if found
    const user = await prisma.user.findUnique({
        where: {
            email: email.toString()
        }
    })
    if (user) return Response.json({}, {status: 404})

    // Create new user with data
    const newUser = await prisma.user.create({
        data: {
            password: bcrypt.hashSync(password.toString(), 10),
            email: email.toString(),
            admin: parseInt(admin.toString()) > 0,
            phone: phone.toString(),
            uuid: uuid(),
            username: username.toString(),
        }
    })

    // Disconnect prisma
    prisma.$disconnect()

    // return status 200
    return Response.json({
        uuid: newUser.uuid,
        phone: newUser.phone,
        email: newUser.email,
        admin: newUser.admin,
        username: newUser.username
    } as IResponseUser, {status: 200})
}