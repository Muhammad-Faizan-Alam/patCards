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
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                try {
                    await dbConnect();
                    const user = await User.findOne({ email: credentials.email });

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

                    // Check if memberSince is more than 6 months ago
                    if (user.member === 'member' && user.memberSince) {
                        const sixMonthsAgo = new Date();
                        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

                        if (new Date(user.memberSince) < sixMonthsAgo) {
                            user.member = 'visitor'; // Or 'not', based on your logic
                            user.memberSince = null;
                            await user.save();
                        }
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        username: user.username,
                        member: user.member,
                        memberSince: user.memberSince,
                        class: user.class
                    };
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
                token.username = user.username;
                token.member = user.member;
                token.memberSince = user.memberSince;
                token.class = user.class;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.username = token.username as string;
                session.user.member = token.member as string;
                session.user.memberSince = token.memberSince as string | null;
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
};