import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/config/db";
import userModel from "@/models/userModel";
import generateToken from "@/helpers/generateToken";
import Bcrypt from "bcryptjs";

// @desc    Login a user
// @route   POST /api/authentication/login
// @access  Public
// @return  { id, name, email, TokenJWT }
export async function POST(req: NextRequest) {
  // Connect to DB
  await ConnectDB();

  // Get data from request
  const { email, password } = await req.json();

  try {
    // Check if all required fields are filled
    if (!email) throw new Error("Please enter an email");
    if (!password) throw new Error("Please enter a password");

    // Check if user already exists
    const User = await userModel.findOne({ email: email });
    if (User) {
      // Check if password is correct
      const passwordCorrect = await Bcrypt.compare(password, User.password);
      if (passwordCorrect) {
        return NextResponse.json({
          id: User._id,
          name: User.name,
          email: User.email,
          token: generateToken(User._id),
        });
      } else {
        throw new Error("Password or email incorrect");
      }
    } else {
      throw new Error("Password or email incorrect");
    }
  } catch (error: any) {
    console.log(error);
    // return NextResponse.json({ error: error.message });
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
