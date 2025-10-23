require("dotenv").config();
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectToDB from "../../../../lib/db";
import Profile from "../../../../lib/models/schema";

export async function POST(req){
    try{
        await connectToDB();
        const {name,password} = await req.json();
        const user = await Profile.findOne({name:name});
        if(!user){
            return NextResponse.json({success:false,message:"User not found"},{status:404});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return NextResponse.json({success:false,message: "Wrong Password"},{status:401});
        }

         const token = jwt.sign({name:user.name,id:user.id},process.env.JWT_SECRET,{expiresIn: "1h"});

         return NextResponse.json({success:true,message:"Succesfully Logged in",token},{status:200});

    }catch(err){
        console.log(err);
        return NextResponse.json({success:false,message:"Server error"},{status:500});
    }
}


export async function GET(req){
    try{
        await connectToDB();
        const user = Profile.find();
        return NextResponse.json(JSON.stringify(user),{status:200});
    }catch(err){
        return NextResponse.json(JSON.stringify({error:err.message}),{status:500})
    }
}