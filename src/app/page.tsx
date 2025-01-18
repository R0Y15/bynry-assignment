'use client';

import { LampContainer } from "@/components/ui/lamp";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] flex flex-col items-center justify-center">
      <LampContainer className="flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          <div className="flex flex-col items-center justify-center space-y-8 w-full relative top-20">
            <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Welcome to <span className="text-brand">Bynry</span>
            </h1>
            <p className="max-w-4xl text-lg text-gray-300 sm:text-xl tracking-widest">
              Discover amazing profiles and connect with people around the world.
              Join our community today and start exploring.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 1.3,
                duration: 0.6,
                ease: "easeIn"
              }}
              className="flex flex-col gap-4 sm:flex-row pt-4"
            >
              <Link
                href="/profiles"
                className="rounded-full bg-brand hover:bg-brand-dark px-8 py-3 text-lg font-medium text-white transition-colors tracking-tight"
              >
                View Profiles
              </Link>
              <Link
                href="/admin"
                className="rounded-full border border-white/20 px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-white/10 tracking-tight"
              >
                Create Profile
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </LampContainer>
    </main>
  );
}

const features = [
  {
    title: "Profile Creation",
    description: "Create and customize your profile with ease. Add your details, location, and contact information.",
  },
  {
    title: "Interactive Map",
    description: "Explore profiles on an interactive map. Find people near you or discover connections worldwide.",
  },
  {
    title: "Easy Contact",
    description: "Connect with others through email or phone. Building connections has never been easier.",
  },
];
