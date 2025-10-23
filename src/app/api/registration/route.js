
import connectToDB from "../../../../lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import Profile from "../../../../lib/models/schema";

export async function POST(req){
    try{
        await connectToDB();
        const{name,password,email} = await req.json();
        if(!name || !password || !email){
            return NextResponse.json({success:false,message:"All fields are empty"},{status:400});

        }
        const currentUser = await Profile.findOne({name});
        if(currentUser){
            return NextResponse.json({success:false,message:"Username already exists"},{status:400});
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const newProfile =  await Profile.create({
            name,
            password: hashedPassword,
            email,
            Github:"",
            LinkedIn:"",
            bio:"",
            skills:[],
            experience:[],
            projects:[]
        });
        return NextResponse.json({success:true,message:"User registered Successfully",profile:newProfile},{status:201});
    }
    catch(err){
        console.log(err);
        return NextResponse.json({success:false,message:err.message},{status:500})

    }
}

export async function GET() {
  try {
    await connectToDB();
    const users = await Profile.find();
    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}