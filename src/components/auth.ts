import dbConnect from '@/dbConfig/dbConfig';
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "alifaizanch3101@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any) {
                // Add logic here to look up the user from the credentials supplied
                if (!credentials?.email && !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                try {
                    await dbConnect();
                    const user = await User.findOne({
                        email: credentials.email,
                    });

                    if (!user) {
                        throw new Error("No user found with the given email");
                    }
                    const isValidPassword = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );
                    if (!isValidPassword) {
                        throw new Error("Invalid password");
                    }
                    return {
                        id: user._id.toString(),
                        email: user.email,
                    }
                } catch (error: any) {
                    throw new Error("Error during authentication: " + error.message);
                }
            }
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
        error: '/login',
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET,
}