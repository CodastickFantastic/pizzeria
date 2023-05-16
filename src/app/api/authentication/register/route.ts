import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/config/db";
import userModel from "@/models/userModel";
import generateToken from "@/helpers/generateToken";
import Bcrypt from "bcryptjs";

// @desc    Register a new user
// @route   POST /api/authentication/register
// @access  Public
// @return  { id, name, email, TokenJWT }
export async function POST(req: NextRequest, res: NextResponse) {
  // Connect to DB
  await ConnectDB();

  // Get data from request
  const { name, email, password, password2 } = await req.json();

  try {
    // Check if all required fields are filled
    if (!name) throw new Error("Please enter a name");
    if (!email) throw new Error("Please enter an email");
    if (!password) throw new Error("Please enter a password");
    if (!password2) throw new Error("Please enter a password confirmation");

    // Check if passwords match
    if (password !== password2) throw new Error("Passwords do not match");

    // Check if user already exists
    const userExists = await userModel.findOne({ email: email });
    if (userExists) throw new Error("User already exists");

    //Hash Password
    const salt = await Bcrypt.genSalt(10);
    const hashedPassword = await Bcrypt.hash(password, salt);

    let User = await userModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    return NextResponse.json({
      id: User._id,
      name: User.name,
      email: User.email,
      token: generateToken(User._id),
    });
  } catch (error: any) {
    console.log(error);
    // return NextResponse.json({ error: error.message });
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
