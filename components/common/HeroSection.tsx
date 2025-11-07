'use client';

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { RootState } from '@/lib/store';

export function HeroSection() {
  const { isAuthenticated, user, cart } = useSelector((state: RootState) => state.app);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.85;
    }
  }, []);

  if (isAuthenticated && user) {
    return (
      <section className="relative h-screen overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
            poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%230f172a'/%3E%3C/svg%3E"
          >
            <source src="/assets/intro.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-slate-900/600 backdrop-blur-[1px]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-900/90"></div>
        </div>

        <div className="absolute inset-0 opacity-20">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-emerald-400/10 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.4, 0.2, 0.4],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-sky-400/10 rounded-full blur-xl"
          />
        </div>

        <div className="relative z-10 flex h-full items-center justify-center text-center px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                Discover Flavors Beyond Imagination
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-3xl md:text-4xl font-semibold text-transparent bg-clip-text 
             bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white
             drop-shadow-[0_0_12px_rgba(59,130,246,0.3)] tracking-wide mb-10"
            >
              Hi, <span className="font-bold">{user?.name}</span> 👋
            </motion.p>


            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="max-w-2xl mx-auto mb-10"
            >
              <div className="relative group">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  placeholder="Search for dishes, cuisines, or restaurants..."
                  className="w-full px-6 py-4 rounded-2xl text-slate-900 bg-white/95 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/30 shadow-2xl shadow-black/30 transition-all duration-300 group-hover:bg-white"
                />
                <Button className="absolute right-2 top-2 bg-emerald-500 hover:bg-emerald-600 rounded-xl p-3 shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:scale-105">
                  <Search className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/menu" prefetch={false}>
                <Button
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white text-lg px-8 py-6 rounded-2xl shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/40 group"
                >
                  <span className="flex items-center gap-2">
                    Explore Menu
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                    >
                      →
                    </motion.span>
                  </span>
                </Button>
              </Link>

              <Link href="/top-restaurants" prefetch={false}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-gray-700 hover:bg-white/10 text-lg px-8 py-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white"
                >
                  View Top Restaurants
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

       
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent"
          >
            Culinary Excellence
            <br />
            <span className="text-emerald-400">Delivered</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl mb-8 text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            Experience premium dining from the comfort of your home.
            Curated restaurants, exceptional quality, and seamless delivery.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative group">
              <input
                type="text"
                placeholder="Search for cuisine, restaurants, or dishes..."
                className="w-full px-6 py-4 rounded-2xl text-slate-900 bg-white/95 backdrop-blur-sm border border-slate-300/30 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/30 shadow-2xl shadow-black/20 transition-all duration-300 group-hover:bg-white"
              />
              <Button className="absolute right-2 top-2 bg-emerald-500 hover:bg-emerald-600 rounded-xl p-3 shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:scale-105">
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/menu" prefetch={false}>
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white text-lg px-8 py-6 rounded-2xl shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/40 group"
              >
                <span className="flex items-center gap-2">
                  Explore Menu
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                  >
                    →
                  </motion.span>
                </span>
              </Button>
            </Link>

            <Link href="/" prefetch={false}>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-400 text-slate-200 hover:bg-white/10 text-gray-700 hover:text-white hover:border-white text-lg px-8 py-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                View Top Restaurants
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16 pt-8 border-t border-slate-700/50"
          >
            {[
              { number: '500+', label: 'Premium Restaurants' },
              { number: '50+', label: 'Cuisine Types' },
              { number: '30min', label: 'Avg. Delivery' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="text-2xl md:text-3xl font-bold text-emerald-400 mb-2"
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-10 w-6 h-6 bg-emerald-400/20 rounded-full blur-sm"
      />
      <motion.div
        animate={{
          y: [0, 15, 0],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-1/4 right-16 w-8 h-8 bg-sky-400/15 rounded-full blur-sm"
      />
    </section>
  );
}