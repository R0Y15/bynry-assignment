'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="w-full flex items-center justify-center">
                        <Image src="/404.svg" alt="404" width={500} height={500} />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <h2 className="text-3xl font-semibold text-white mb-4">Page Not Found</h2>
                    <p className="text-gray-400 mb-8 text-lg">
                        Oops! The page you're looking for seems to have wandered off.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-brand hover:bg-brand-dark rounded-full transition-colors duration-200"
                    >
                        Return Home
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="mt-12 text-gray-500"
                >
                    <p>Looking for something specific?</p>
                    <div className="flex justify-center gap-4 mt-4">
                        <Link
                            href="/profiles"
                            className="text-brand hover:text-brand-light transition-colors"
                        >
                            View Profiles
                        </Link>
                        <span className="text-gray-600">•</span>
                        <Link
                            href="/admin"
                            className="text-brand hover:text-brand-light transition-colors"
                        >
                            Admin Panel
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
} 