import {PrismaClient} from "@prisma/client";
import {IResponseUser} from "@/app/api/user/get/route";
import bcrypt from "bcrypt";

export async function POST(request: Request){
    // Get form data
    const formData = await request.formData()

    // Get data with form data
    const uuid = formData.get("uuid")
    const email = formData.get("email")
    const username = formData.get("username")
    const phone = formData.get("phone")
    const password = formData.get("password")
    const admin = formData.get("admin")

    // return status 400 if data not exist
    if(!uuid) return Response.json({}, {status: 400})

    // verify data
    if(admin && !parseInt(admin.toString())) Response.json({}, {status: 400})

    // Create prisma client
    const prisma = new PrismaClient()

    // Find user and return status 404 if not found
    const user = await prisma.user.findUnique({
        where: {
            uuid: uuid.toString()
        }
    })
    if (!user) return Response.json({}, {status: 404})

    // New data
    const newData: {
        email?: string,
        username?: string,
        phone?: string,
        password?: string,
        admin?: boolean
    } = {}
    email && (newData.email = email.toString())
    username && (newData.username = username.toString())
    phone && (newData.phone = phone.toString())
    password && (newData.password = bcrypt.hashSync(password.toString(), 10))
    admin && (newData.admin = parseInt(admin.toString()) > 0)

    // Update user
    const updateUser = await prisma.user.update({
        where: {
            uuid: user.uuid
        },
        data: newData
    })

    // Disconnect prisma
    prisma.$disconnect()

    // return status 200
    return Response.json({
        email: updateUser.email,
        admin: updateUser.admin,
        username: updateUser.username,
        phone: updateUser.phone,
        uuid: updateUser.uuid
    } as IResponseUser, {status: 200})
}