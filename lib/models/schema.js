import mongoose from "mongoose";

const ProfileSchema = mongoose.Schema({
    name:{type:String,required:true},
    password:{type:String},
    email:{type:String},
    Github:{type:String},
    Linkedin:{type:String},
    bio:{type:String},
    Skills:[String],
    experience:[{company:String,role:String,duration:String,description:String}],
    projects:[{title:String,description:String,link:String}],
    education: [String],
    achievements: [String],
    certifications: [String],
    image: String,
},{timestamps:true});

const Profile = mongoose.models.Profile || mongoose.model("Profile",ProfileSchema);
export default Profile;