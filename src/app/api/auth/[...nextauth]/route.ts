import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import {PrismaClient} from "@prisma/client";

export const nextAuthConfig: NextAuthOptions = {
    callbacks: {
        redirect({url, baseUrl}) {
            return baseUrl
        }
    },
    pages: {
        signIn: "/auth?type=signin"
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            id: "sign-in",
            name: "Sign In",
            credentials: {
                email: {label: "Email", type: "email", placeholder: "contact@example.com"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials, req) {
                if (!credentials) return null

                const prisma = new PrismaClient()

                const users = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                await prisma.$disconnect()

                if (users) {
                    if (bcrypt.compareSync(credentials.password, users.password)){
                        return {
                            email: users.email,
                            name: users.name
                        } as any
                    }
                }

                return null
            }
        }),
        CredentialsProvider({
            name: "Sign Up",
            type: "credentials",
            id: "sign-up",
            credentials: {
                username: {label: "Username", type: "text", placeholder: "username"},
                email: {label: "Email", type: "email", placeholder: "contact@example.com"},
                password: {label: "Password", type: "password", placeholder: "password"}
            },
            authorize: async (credentials, req) => {
                if (!credentials) return null

                const prisma = new PrismaClient()

                let findResult = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if (findResult) return null

                findResult = await prisma.user.findFirst({
                    where: {
                        name: credentials.username
                    }
                })

                if (findResult) return null

                const result = await prisma.user.create({
                    data: {
                        name: credentials.username,
                        password: bcrypt.hashSync(credentials.password, 10),
                        email: credentials.email
                    }
                })

                prisma.$disconnect()

                return {
                    email: result.email,
                    name: result.name
                } as any
            }
        })
    ]
}

const handler = NextAuth(nextAuthConfig)

export {handler as GET, handler as POST}