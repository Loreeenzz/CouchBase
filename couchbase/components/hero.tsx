"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative pb-16">
      <div className="flex flex-col items-center text-center space-y-12">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
            Couchbase
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Empowering Innovation Through Modern Database Solutions
          </p>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full"
        >
          <h2 className="text-2xl font-semibold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Team Member 1 */}
            <div className="group relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg transition-transform hover:-translate-y-1">
              <div className="text-center space-y-4">
                <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <Image
                    src="/lorenz.png"
                    alt="Blaise Lorenz Bernabe"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Blaise Lorenz Bernabe</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Hipster
                  </p>
                </div>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="group relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg transition-transform hover:-translate-y-1">
              <div className="text-center space-y-4">
                <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <Image
                    src="/arjay.jpg"
                    alt="Arjay Nino Saguisa"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Arjay Nino Saguisa</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Hacker
                  </p>
                </div>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="group relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg transition-transform hover:-translate-y-1">
              <div className="text-center space-y-4">
                <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <Image
                    src="/red.jpg"
                    alt="John Reddick Quijano"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium">John Reddick Quijano</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Hustler
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
