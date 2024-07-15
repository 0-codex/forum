import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import {PrismaClient} from "@prisma/client";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            type: "credentials",
            id: "credentials",
            name: "Credentials",
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
        })
    ]
})

export {handler as GET, handler as POST}