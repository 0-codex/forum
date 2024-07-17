import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import {PrismaClient} from "@prisma/client";
import {v7 as uuid} from "uuid"

export const nextAuthConfig: NextAuthOptions = {
    callbacks: {
        redirect({url, baseUrl}) {
            return baseUrl
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    email: token.email,
                    uuid: token.uuid,
                    phone: token.phone,
                    admin: token.admin,
                    username: token.username
                };
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.email = user.email;
                token.uuid = user.uuid;
                token.phone = user.phone;
                token.admin = user.admin;
                token.username = user.username;
            }
            return token;
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
                // Get credentials
                if (!credentials) return null

                // Return status 400 if data not exist
                if (!credentials.email || !credentials.password) return null

                // Create prisma client
                const prisma = new PrismaClient()

                // Find user and return status 404 if not found
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    }
                })
                if (!user) return null
                if (user.email != credentials.email || !bcrypt.compareSync(credentials.password, user.password)) return null

                prisma.$disconnect()

                // return data
                return {
                    email: user.email,
                    uuid: user.uuid,
                    phone: user.phone,
                    admin: user.admin,
                    username: user.username
                } as any
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
                // Get credentials
                if (!credentials) return null

                // return status 400 if data not exist
                if (!credentials.email || !credentials.password || !credentials.username) return null

                // Create prisma client
                const prisma = new PrismaClient()

                // Find user and return status 404 if found
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email.toString()
                    }
                })
                if (user) return Response.json({}, {status: 404})

                // Create new user with data
                const newUser = await prisma.user.create({
                    data: {
                        email: credentials.email,
                        uuid: uuid(),
                        phone: "00000000",
                        admin: false,
                        username: credentials.username,
                        password: bcrypt.hashSync(credentials.password, 10)
                    }
                })

                // Disconnect prisma
                prisma.$disconnect()

                // return status 200
                return {
                    email: newUser.email,
                    uuid: newUser.uuid,
                    phone: newUser.phone,
                    admin: newUser.admin,
                    username: newUser.username
                } as any
            }
        })
    ]
}

const handler = NextAuth(nextAuthConfig)

export {handler as GET, handler as POST}