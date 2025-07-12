import { NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import dbConnect from "@/dbConfig/dbConfig";

await dbConnect();

export async function POST(request: any) {
    try {
        const body = await request.json();
        const { email, password } = body;
        
        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }
        if (!password) {
            return NextResponse.json({ error: "Password is required" }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }


        const salt = bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, await salt);

        const newUser = new User({
            email,
            password: hashedPassword
        });
        const saveUser = await newUser.save();
        console.log("User signed up successfully:", saveUser);

        return NextResponse.json({ message: "User signed up successfully!" }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}