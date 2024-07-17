import NextAuth from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            email: string,
            uuid: string,
            phone: string,
            admin: boolean,
            username: string
        }
    }

    interface User {
        email: string,
        uuid: string,
        phone: string,
        admin: boolean,
        username: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        email: string,
        uuid: string,
        phone: string,
        admin: boolean,
        username: string
    }
}