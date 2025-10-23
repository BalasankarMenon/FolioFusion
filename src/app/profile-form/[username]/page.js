"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation"; 


export default function ProfileForm(){
    const router = useRouter();
    const{name} = useParams();
    const[form,setForm] = useState({
        name:"",
        email:"",
        Github:"",
        Linkedin:"",
        bio:""
    });
   
    const [Skills,setSkills] = useState([""]);
    const [experience,setExperience] = useState([{company:"",role:"",duration:"",description:""}]);
    const[projects,setProjects] = useState([{title:"",description:"",link:""}]);
    const [education,seteducation] = useState([""]);
    const [achievements,setAcheivements] = useState([""]);
    const [certifications,setCertifications] = useState([""]);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    


    async function fetchProfile() {
      try {
        const res = await fetch(`/api/profile?name=${name}`);
        const data = await res.json();
        if (data.success && data.profile) {
          const p = data.profile;
          setForm({ name: p.name, email: p.email, Github: p.Github, Linkedin: p.Linkedin, bio: p.bio });
          setSkills(p.Skills || [""]);
          setExperience(p.experience || [{ company: "", role: "", duration: "", description: "" }]);
          setProjects(p.projects || [{ title: "", description: "", link: "" }]);
          seteducation(p.education || [""]);
          setAcheivements(p.achievements || [""]);
          setCertifications(p.certifications || [""]);
                    setImagePreview(p.image ? `data:image/jpeg;base64,${p.image}` : "");
        }
      } catch (err) {
        console.log(err);
      }
    }

        useEffect(() => {
            let mounted = true;
            const run = async () => {
                const token = localStorage.getItem("token");
                if (!token) {
                    router.replace("/login");
                    return;
                }

                try {
                    const res1 = await fetch("/api/verify", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ token }),
                    });
                    const data1 = await res1.json();
                    if (!data1.valid) {
                        localStorage.removeItem("token");
                        router.replace("/login");
                        return;
                    }
                    if (data1.decoded.name !== name) {
                        localStorage.removeItem("token");
                        return;
                    }
                } catch (err) {
                    console.error("Verification error:", err);
                    localStorage.removeItem("token");
                    router.replace("/login");
                    return;
                }
                if (name && mounted) {
                    await fetchProfile();
                }
            };

            run();
            return () => {
                mounted = false;
            };
        }, [router, name]);

    function addSkill(){
        setSkills((prev)=>{
            return [...prev,""]
        })
    }
    function handleSkillexperience(idx,value){
        setSkills(prev=>{
            const newSkill = [...prev];
            newSkill[idx] = value;
            return newSkill;
        })
    }
    function removeSkills(idx){
        setSkills((prev)=>{
            return prev.filter((_,i)=>i!==idx)
        })
    }
    function addExperience(){
        setExperience((prev)=>{
            return [...prev,{company:"",role:"",duration:"",description:""}]
        })
    }

    function handleExperienceChange(idx,key,value){
        setExperience(prev=>{
            const newExp = [...prev];
            newExp[idx][key] = value;
            return newExp;
        })
    }
    function removeExperience(idx){
        setExperience((prev)=>{
            return prev.filter((_,i)=>i!==idx)
        })
    }

    function addProjects(){
        setProjects((prev)=>{
            return [...prev,{title:"",description:"",link:""}]
        })
    }
    
    function handleProjects(idx,key,value){
           setProjects(prev=>{
            const newExp = [...prev];
            newExp[idx][key] = value;
            return newExp;
        })
    }
    function removeProjects(idx){
        setProjects((prev)=>{
            return prev.filter((_,i)=>i!==idx)
        })
    }

    function addEducation(){
        seteducation((prev)=>{
            return [...prev,""]
        })
    }
    function handleEducationexperience(idx,value){
        seteducation(prev=>{
            const newSkill = [...prev];
            newSkill[idx] = value;
            return newSkill;
        })
    }
    function removeEducation(idx){
        seteducation((prev)=>{
            return prev.filter((_,i)=>i!==idx)
        })
    }

    function addAchievements(){
        setAcheivements((prev)=>{
            return [...prev,""]
        })
    }
    function handleAchievementsexperience(idx,value){
        setAcheivements(prev=>{
            const newSkill = [...prev];
            newSkill[idx] = value;
            return newSkill;
        })
    }
    function removeAchievements(idx){
        setAcheivements((prev)=>{
            return prev.filter((_,i)=>i!==idx)
        })
    }



     function addCertification(){
        setCertifications((prev)=>{
            return [...prev,""]
        })
    }
    function handleCeritficationexperience(idx,value){
        setCertifications(prev=>{
            const newCert = [...prev];
            newCert[idx] = value;
            return newCert;
        })
    }
    function removeCertifications(idx){
        setCertifications((prev)=>{
            return prev.filter((_,i)=>i!==idx)
        })
    }

    const[message,setMessage] = useState();
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
    async function handleSubmit(e){
        e.preventDefault();
        try{
            const formData = new FormData(e.target);
            formData.append("name", form.name);
            formData.append("email", form.email);
            formData.append("Github", form.Github);
            formData.append("Linkedin", form.Linkedin);
            formData.append("bio", form.bio);
            formData.append("Skills", JSON.stringify(Skills));
            formData.append("experience", JSON.stringify(experience));
            formData.append("projects", JSON.stringify(projects));
            formData.append("education", JSON.stringify(education));
            formData.append("achievements", JSON.stringify(achievements));
            formData.append("certifications", JSON.stringify(certifications));
            if (imageFile) formData.append("image", imageFile);
                const res = await fetch("/api/profile",{
                    method:"POST",
                    body: formData
                });
                const data = await res.json();
                if(data.success){
                    setMessage("Profile saved successfully!");
                    // Use server returned profile (if any) to populate UI and image preview
                    const returned = data.profile || {};
                    setForm({
                      name: returned.name || form.name,
                      email: returned.email || form.email,
                      Github: returned.Github || form.Github,
                      Linkedin: returned.Linkedin || form.Linkedin,
                      bio: returned.bio || form.bio,
                    });
                    setSkills(returned.Skills || Skills || [""]);
                    setExperience(returned.experience || experience || [{ company: "", role: "", duration: "", description: "" }]);
                    setProjects(returned.projects || projects || [{ title: "", description: "", link: "" }]);
                    seteducation(returned.education || education || [""]);
                    setAcheivements(returned.achievements || achievements || [""]);
                    setCertifications(returned.certifications || certifications || [""]);
                    setImagePreview(returned.image ? `data:image/jpeg;base64,${returned.image}` : imagePreview);
                    // Re-fetch to ensure frontend shows the latest saved data
                    fetchProfile();
                }else{
                    setMessage(" Error saving profile.");
                }
        }
        catch(err){
            console.error("Profile save error:", err);
            setMessage("Network error: could not save profile");
        }
    }
    function Logout(){
        localStorage.removeItem("token");
        return router.replace("/");
    }
    return(
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
            <motion.button initial={{opacity:0,scale:0.9}}
            animate={{opacity:1,scale:1}}
            whileHover={{scale:1.05}}
            whileTap={{scale:0.95}}
            onClick={Logout}
            transition={{duration:0.5,ease:"easeOut"}}className="ml-250 cursor-pointer rounded  rounded-md border border-violet-300 hover:border-black-300 pt-2 p-3 bg-red-600 font-bold text-gray-200">Logout</motion.button>
            <motion.h1 className="text-3xl font-bold mb-4 text-blue-500 font-sans shadow-md"
            initial={{opacity:0,y:-30}}
            animate={{opacity:1,y:0}}
            transition={{duration:0.6}}>Create your profile</motion.h1>
            
            <motion.form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-xl p-6 w-[600px] h-auto space-y-4"
            initial={{opacity:0,scale:0.9}}
            animate={{opacity:1,scale:1}}
            transition={{duration:0.5,ease:"easeOut"}}>
                <div>
            <label className="block font-semibold mb-1 text-gray-700">Profile Image:</label>
            <input type="file" accept="image/*" className="bg-gray-500 w-50 border border-2 border-black"onChange={handleImageChange} />
          {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 text-gray-500 rounded-full object-cover" />}
            </div>
                {["name","email","Github","Linkedin"].map((field)=>{
                    return <div key={field}>
                        <label className="block text-gray-500 font-semibold mb-1 capitalize">
                            {field}
                        </label>
                        <motion.input 
                        whileFocus={{scale:1.02,borderColor:"#3b82f6"}}
                        transition={{type:"spring",stiffness:200}}
                        type="text"
                        name={field}
                        value={form[field]}
                        onChange={handleChange}
                        placeholder={`Enter your ${field}`}
                        className="w-full border border-gray-200 text-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                })}
                <label className="block text-gray-500 font-semibold mb-1 capitalize">Bio</label>
                <motion.textarea 
                whileFocus = {{scale:1.02,borderColor:"#3b82f6"}}
                transition={{type:"spring",stiffness:200}}
                type="text"
                name = "bio"
                value={form["bio"]}
                onChange={handleChange}
                placeholder="Enter your Bio"
                className="w-full border border-gray-200 text-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                
                <motion.button 
                type="button"
                onClick={addSkill}
                whileHover={{scale:1.05}}
                className="w-[400px] py-1 ml-20 font-semibold bg-purple-300 text-gray-800 hover:text-blue-700 hover:background-purple-700 rounded-md transition cursor-pointer"> 
                    +Add Skills</motion.button>

                {Skills.length>0 && (
                    <motion.div className="space-y-4">
                        {Skills.map((skill,idx)=>{
                            return<div key={idx} className="flex items-center space-x-2">
                            <motion.input
                                key={idx}
                                type="text"
                                className="w-[400px] ml-20 border border-gray-200 text-gray-700 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value = {skill}
                                onChange={(e)=>handleSkillexperience(idx,e.target.value)}
                                placeholder="Enter your skill"
                            />
                            <motion.button
                            type="button"
                            onClick={() => removeSkills(idx)}
                            className="text-gray-70 font-bold mt-2 bg-red-600 px-2 py-2 border rounded-md cursor-pointer ml-4"
                            >
                            Remove Skill
                            </motion.button>
                            </div>
                        })}
                        
                    </motion.div>
                )}

                <motion.button
                whileHover={{scale:1.05}}
                whileTap={{scale:0.95}}
                type="button"
                 onClick={addExperience}
                className="w-[400px] ml-20 py-1 font-semibold bg-orange-300 text-gray-800 hover:text-blue-700  rounded-md transition cursor-pointer">
                    +Add experience
                </motion.button>
                {experience.length > 0 && (
                <motion.div className="space-y-4">
                    {experience.map((exp, idx) => (
                    <div key={idx} className="bg-gray-100 p-4 rounded-md shadow space-y-2">
                        {Object.keys(exp).map((key) => (
                        <motion.input
                            key={`${idx}-${key}`}
                            type="text"
                            name={key}
                            value={exp[key]}
                            onChange={(e) => handleExperienceChange(idx, key, e.target.value)}
                            placeholder={`Enter your ${key}`}
                            className="w-[400px] border border-gray-200 text-gray-700 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            whileFocus={{ scale: 1.01, borderColor: "#1c417cff" }}
                            transition={{ type: "spring", stiffness: 200 }}
                        />
                        ))}
                        <motion.button
                        type="button"
                        onClick={() => removeExperience(idx)}
                        className="text-gray-70 font-bold mt-2 bg-red-600 px-2 py-2 border rounded-md cursor-pointer ml-4"
                        >
                        Remove
                        </motion.button>
                    </div>
                    ))}
                </motion.div>
                )}

                <motion.button 
                type="button"
                onClick={addProjects}
                whileHover={{scale:1.05}}
                className="w-[400px] py-1 ml-20 font-semibold bg-yellow-300 text-gray-800 hover:text-blue-700 hover:background-purple-700 rounded-md transition cursor-pointer"> 
                    +Add Your Projects</motion.button>
                
                {projects.length > 0 && (
                <motion.div className="space-y-4">
                    {projects.map((proj, idx) => (
                    <div key={idx} className="bg-gray-100 p-4 rounded-md shadow space-y-2">
                        {Object.keys(proj).map((key) => (
                        <motion.input
                            key={`${idx}-${key}`}
                            type="text"
                            name={key}
                            value={proj[key]}
                            onChange={(e) => handleProjects(idx, key, e.target.value)}
                            placeholder={`Enter your ${key}`}
                            className="w-[400px] border border-gray-200 text-gray-700 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            whileFocus={{ scale: 1.01, borderColor: "#1c417cff" }}
                            transition={{ type: "spring", stiffness: 200 }}
                        />
                        ))}
                        <motion.button
                        type="button"
                        onClick={() => removeProjects(idx)}
                        className="text-gray-70 font-bold mt-2 bg-red-600 px-2 py-2 border rounded-md cursor-pointer ml-4"
                        >
                        Remove
                        </motion.button>
                    </div>
                    ))}
                </motion.div>
                )}

                <motion.button 
                type="button"
                onClick={addEducation}
                whileHover={{scale:1.05}}
                className="w-[400px] py-1 ml-20 font-semibold bg-purple-300 text-gray-800 hover:text-blue-700 hover:background-purple-700 rounded-md transition cursor-pointer"> 
                    +Education</motion.button>

                {education.length>0 && (
                    <motion.div className="space-y-4">
                        {education.map((edu,idx)=>{
                            return<div key={idx} className="flex items-center space-x-2">
                            <motion.input
                                key={idx}
                                type="text"
                                className="w-[400px] ml-20 border border-gray-200 text-gray-700 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value = {edu}
                                onChange={(e)=>handleEducationexperience(idx,e.target.value)}
                                placeholder="Enter your education"
                            />
                            <motion.button
                            type="button"
                            onClick={() => removeEducation(idx)}
                            className="text-gray-70 font-bold mt-2 bg-red-600 px-2 py-2 border rounded-md cursor-pointer ml-4"
                            >
                            Remove 
                            </motion.button>
                            </div>
                        })}
                        
                    </motion.div>
                )}

                <motion.button 
                type="button"
                onClick={addAchievements}
                whileHover={{scale:1.05}}
                className="w-[400px] py-1 ml-20 font-semibold bg-purple-300 text-gray-800 hover:text-blue-700 hover:background-purple-700 rounded-md transition cursor-pointer"> 
                    +Achievements</motion.button>

                {achievements.length>0 && (
                    <motion.div className="space-y-4">
                        {achievements.map((achievement,idx)=>{
                            return<div key={idx} className="flex items-center space-x-2">
                            <motion.input
                                key={idx}
                                type="text"
                                className="w-[400px] ml-20 border border-gray-200 text-gray-700 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value = {achievement}
                                onChange={(e)=>handleAchievementsexperience(idx,e.target.value)}
                                placeholder="Enter your achievement"
                            />
                            <motion.button
                            type="button"
                            onClick={() => removeAchievements(idx)}
                            className="text-gray-70 font-bold mt-2 bg-red-600 px-2 py-2 border rounded-md cursor-pointer ml-4"
                            >
                            Remove 
                            </motion.button>
                            </div>
                        })}
                        
                    </motion.div>
                )}

                <motion.button 
                type="button"
                onClick={addCertification}
                whileHover={{scale:1.05}}
                className="w-[400px] py-1 ml-20 font-semibold bg-purple-300 text-gray-800 hover:text-blue-700 hover:background-purple-700 rounded-md transition cursor-pointer"> 
                    +Certifications</motion.button>

                {certifications.length>0 && (
                    <motion.div className="space-y-4">
                        {certifications.map((cert,idx)=>{
                            return<div key={idx} className="flex items-center space-x-2">
                            <motion.input
                                key={idx}
                                type="text"
                                className="w-[400px] ml-20 border border-gray-200 text-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value = {cert}
                                onChange={(e)=>handleCeritficationexperience(idx,e.target.value)}
                                placeholder="Enter your Certifications"
                            />
                            <motion.button
                            type="button"
                            onClick={() => removeCertifications(idx)}
                            className="text-gray-70 font-bold mt-2 bg-red-600 px-2 py-2 border rounded-md cursor-pointer ml-4"
                            >
                            Remove 
                            </motion.button>
                            </div>
                        })}
                        
                    </motion.div>
                )}


                <motion.button
                whileHover={{scale:1.05}}
                whileTap={{scale:0.95}}
                type="submit"
                className="w-full py-2 font-semibold bg-blue-300 text-gray-800 hover:text-gray-200 hover:bg-green-600 rounded-md transition cursor-pointer">
                    Save Profile 
                </motion.button>
                {message && (
                    <motion.p
                    className="text-center text-gray-700 mt-3"
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    transition={{duration:0.5}}>{message}</motion.p>
                )}
            </motion.form>
        </main>
    )
}