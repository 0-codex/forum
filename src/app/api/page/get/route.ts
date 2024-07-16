import {NextRequest} from "next/server";
import {PrismaClient} from "@prisma/client";
import {IUser} from "@/app/api/user/get/route";

export interface IPost {
    id: number,
    authorId: number,
    title: string,
    content: string,
    pageId: number
}

export interface IPage {
    id: number,
    userId: number,
    title: string,
    posts: IPost[],
    user: IUser
}

export async function POST(request: NextRequest) {
    const formData = await request.formData()

    const id = formData.get("id")

    if (!id) return Response.json({}, {status: 400})

    const prisma = new PrismaClient()

    const resultPage = await prisma.page.findUnique({
        where: {
            id: parseInt(id.toString())
        }
    })

    if (!resultPage) return Response.json({}, {status: 404})

    const resultPosts = await prisma.post.findMany({
        where: {
            page: resultPage
        }
    })

    const resultUser = await prisma.user.findUnique({
        where: {
            id: resultPage.userId
        }
    })

    if (!resultUser) return Response.json({}, {status: 404})

    prisma.$disconnect()

    return Response.json({
        ...resultPage,
        posts:
        resultPosts,
        user: {
            id: resultUser.id,
            email: resultUser.email,
            name: resultUser.name
        }
    } as IPage, {status: 200})
}