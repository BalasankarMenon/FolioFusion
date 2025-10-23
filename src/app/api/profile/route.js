import { NextResponse } from "next/server";
import connectToDB from "../../../../lib/db";
import Profile from "../../../../lib/models/schema";


export async function POST(req){
    try{
        await connectToDB();
        const formData = await req.formData();

        const name = formData.get("name");
        const bio = formData.get("bio");
        const email = formData.get("email");
        const Github = formData.get("Github");
        const Linkedin = formData.get("Linkedin");

        const Skills = JSON.parse(formData.get("Skills") || "[]");
        const experience = JSON.parse(formData.get("experience") || "[]");
        const projects = JSON.parse(formData.get("projects") || "[]");
        const education = JSON.parse(formData.get("education") || "[]");
        const achievements = JSON.parse(formData.get("achievements") || "[]");
        const certifications = JSON.parse(formData.get("certifications") || "[]");

        const image = formData.get("image");
        let imageBase64 = null;

        if(image && image.size>0){
            const buffer = Buffer.from(await image.arrayBuffer());
            imageBase64 = buffer.toString("base64");
        }

        
        const id = formData.get("_id");
        let existing = null;
        if (id) {
    
            existing = await Profile.findById(id);
        } else {
            existing = await Profile.findOne({ name });
        }
        console.log(`[DEBUG] existing profile: ${existing ? existing._id : "none"}`);

        if (existing) {
     
            const query = id ? { _id: id } : { name };
            const updatedProfile = await Profile.findOneAndUpdate(
                query,
                {
                    email,
                    Github,
                    Linkedin,
                    bio,
                    Skills,
                    experience,
                    projects,
                    education,
                    achievements,
                    certifications,
                    image: imageBase64,
                },
                { new: true }
            );

            return NextResponse.json({ success: true, profile: updatedProfile }, { status: 200 });
        }
    

        const newProfile = await Profile.create({
            name,
            email,
            Github,
            Linkedin,
            bio,
            Skills,
            experience,
            projects,
            education,
            achievements,
            certifications,
            image: imageBase64,
        });
        return NextResponse.json({success: true,profile: newProfile},{status:201});

    }
    catch(err){
        return NextResponse.json({
            success:false,
            error:err.message
        },{status:500});
    }
}

export async function GET(req){
    try{
        await connectToDB();
        const {searchParams} = new URL(req.url);
        const name = searchParams.get("name");
        if(name){
        const profile = await Profile.findOne({name});
        if(!profile){
            return NextResponse.json({success:false,error:"Profile not found"});
        }
        return NextResponse.json({success:true,profile},{status:200});
       
        }
    }catch(err){
        console.log(err);
        return  NextResponse.json({ 
            success:false,
            error:err.message
        },{status:500});
    }
}