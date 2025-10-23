import connectToDB from "../../../../lib/db";
import mongoose from "mongoose";

export async function GET(){
    try{
        await connectToDB();
        const dbstate = mongoose.connection.readyState;
        return new Response(JSON.stringify(
            {status: " DB connected",dbstate}
        ),{status:200});
    }
    catch(err){
        return new Response(JSON.stringify({status: "DB connection failed",error:err.message}),{status:500})
    }
}