"use client"
import Link   from "next/link";
import Image from "next/image";
import { easeIn, easeOut, motion } from "framer-motion";
export default function Home(){
  return(
    <main className="min-h-screen flex flex-col bg-gray-50">
      <header className="flex justify-between items-center p-6 bg-white shadow">
        <div className="flex flex-col justify-evenly">
        <Image src="/logo.jpg" alt="FolioFusion logo" width={75} height={75} className="rounded-lg"></Image>
        <p className="text-gray-800 font-serif">FolioFusion</p>
        </div>
        <nav className="space-x-6">
            <Link href="#" className="hover:text-blue-500 hover:font-extrabold font-semibold font-sans text-green-500 text-[25px]">Home</Link>
            <Link href="#" className="hover:text-blue-500 hover:font-extrabold font-semibold font-sans text-green-500 text-[25px]">Features</Link>
            <Link href="/login" className="hover:text-blue-500 hover:font-extrabold font-semibold font-sans text-green-500 text-[25px]">Login</Link>
        </nav>
      </header>

      <motion.section className="flex flex-col items-center justify-center flex-1 text-center px-6"
      initial={{opacity:0,y:50}}
      animate={{opacity:1,y:0}}
      transition={{duration:0.8,ease:easeOut}}>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-400 mb-4"> Build your developer Portfolio</h2>
          <p className="text-lg md:text-xl text-gray-700 font-bold mb-6">Showcase your projects,skills & experience all in one place</p>
            <motion.a
      whileHover={{scale:1.05}}
      whileTap={{scale:0.95}}
      href="/register"
      className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-green-500 font-extrabold">
        Create Profile
      </motion.a>
      </motion.section>

      <section className="grid md:grid-cols-4 gap-4 p-6">
        {["Projects","Skills","Experience","Customization"].map((feature,i)=>{
          return <motion.div
          key={feature}
          className="bg-white-p4 rounded-lg shadow hover:shadow-lg transition"
          initial={{opacity:0,y:20}}
          animate={{opacity:1,y:0}}
          transition={{delay:0.2*i,duration:0.5}}>
            <h3 className="text-xl font-semibold mb-2 text-gray-600">{feature}</h3>
            <p className="text-gray-400 font-light">Brief description of {feature.toLowerCase()} feature.</p>
          </motion.div>
        })  
        }
      </section>
        <footer className="p-6 bg-blue-900 text-gray-100 text-center">
          © 2025 FolioFusion. Follow us on GitHub | LinkedIn
        </footer>
    </main>
  )
}