"use client"
import { useState } from "react"
import bcrypt from "bcryptjs"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function Register(){
    const router = useRouter();
    const[name,setUsername] = useState("");
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("");
    const[message,setMessage] = useState("");

    async function handleSubmit(e){
        e.preventDefault();
        if(!name || !password || !email){
            setMessage("Please fill all fields");
            return;
        }
        try{
            const res = await fetch("/api/registration",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({name,password,email})
            })
            const data = await res.json();
            if(data.success){
                router.push(`/profile-form/${name}`);
            }else{
                setMessage(data.message || "Registration failed");
            }
        }
        catch(err){ 
            console.log(err);
            setMessage("Network error");
        }
    }
    return(
        <main className="min-h-screen bg-gray-300 flex flex-col items-center justify-center">
           <motion.form
           onSubmit={handleSubmit}
           className="bg-white p-6 rounded shadow-md w-[400px] h-auto"
           initial={{opacity:0,scale:0.9}}
           animate={{opacity:1,scale:1}}
           transition={{duration:0.5,ease:"easeOut"}}>
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-900 font-sans">Register</h2>
               <label className="block text-gray-500 font-semibold mb-1 capitalize">
                            Username:
                        </label> 
                <motion.input 
                type="text"
                placeholder="Username"
                value={name}
                onChange={(e)=>setUsername(e.target.value)}
                className="w-full border border-gray-300 text-gray-600 rounded px-3 py-2"
                whileFocus={{scale:1.02,borderColor:"#3b82f6"}}
                transition={{type:"spring",stiffness:200}}/>

                <label className="mt-3 block text-gray-500 font-semibold mb-1 capitalize">
                            Email:
                        </label>
                <motion.input 
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full border border-gray-300 text-gray-600 rounded px-3 py-2"
                whileFocus={{scale:1.02,borderColor:"#3b82f6"}}
                transition={{type:"spring",stiffness:200}}/>
                <label className="mt-3 block text-gray-500 font-semibold mb-1 capitalize">
                            Password:
                        </label>
                <motion.input 
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="w-full border border-gray-300  text-gray-600 rounded px-3 py-2"
                whileFocus={{scale:1.02,borderColor:"#3b82f6"}}
                transition={{type:"spring",stiffness:200}}/>

                <motion.button
                whileHover={{scale:1.05}}
                whileTap={{scale:0.95}}
                type="submit"
                className="mt-5 w-full py-2 font-semibold bg-blue-300 text-gray-800 hover:text-gray-200 hover:bg-green-600 rounded-md transition cursor-pointer">
                    Sign Up
                </motion.button>
                {message && <p className="text-red-500 text-center">{message}</p>}
           </motion.form>
        </main>
    )
}