"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Orbitron, Space_Grotesk, JetBrains_Mono } from "next/font/google"
import { Sparkles, Zap, Code, BrainCircuit, Bot, Cpu, Terminal } from "lucide-react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400"] })

// Simulated prompt responses that will animate in background terminals
const promptResponses = [
  "Generating image of futuristic city...",
  "Solving recursive algorithm...",
  "Creating responsive UI components...",
  "Optimizing for O(log n) time complexity...",
  "Analyzing edge cases...",
  "Implementing neural network...",
  "Designing user interface...",
  "Generating creative content...",
  "Optimizing database queries...",
  "Translating natural language to code...",
]

// Background terminal positions
const terminalPositions = [
  { top: "5%", left: "8%", width: "25%", opacity: 0.15, delay: 0 },
  { top: "15%", right: "5%", width: "20%", opacity: 0.12, delay: 0.5 },
  { top: "40%", left: "3%", width: "18%", opacity: 0.1, delay: 1.2 },
  { top: "60%", right: "7%", width: "22%", opacity: 0.14, delay: 0.8 },
  { top: "75%", left: "12%", width: "24%", opacity: 0.13, delay: 0.3 },
  { top: "85%", right: "10%", width: "19%", opacity: 0.11, delay: 1.5 },
]

export default function PosterPage() {
  const [initialized, setInitialized] = useState(false)
  const [terminalContents, setTerminalContents] = useState<string[]>(
    terminalPositions.map(() => promptResponses[Math.floor(Math.random() * promptResponses.length)]),
  )

  // Initialize particles
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInitialized(true)
    })
  }, [])

  // Cycle through prompt responses for background terminals
  useEffect(() => {
    const intervals = terminalPositions.map((_, index) => {
      return setInterval(
        () => {
          setTerminalContents((prev) => {
            const newContents = [...prev]
            newContents[index] = promptResponses[Math.floor(Math.random() * promptResponses.length)]
            return newContents
          })
        },
        3000 + Math.random() * 2000,
      )
    })

    return () => intervals.forEach(clearInterval)
  }, [])

  return (
    <div className="flex justify-center items-center min-h-screen bg-black p-4">
      {/* A4 Poster Container */}
      <div className="relative w-full max-w-[210mm] h-[297mm] bg-[#050505] overflow-hidden shadow-2xl">
        {/* Particles Background */}
        {initialized && (
          <Particles
            id="tsparticles"
            className="absolute inset-0"
            options={{
              fullScreen: { enable: false },
              background: {
                color: { value: "transparent" },
              },
              fpsLimit: 120,
              particles: {
                color: { value: "#FFD700" },
                links: {
                  color: "#FFD700",
                  distance: 150,
                  enable: true,
                  opacity: 0.2,
                  width: 1,
                },
                move: {
                  direction: "none",
                  enable: true,
                  outModes: { default: "bounce" },
                  random: true,
                  speed: 0.5,
                  straight: false,
                },
                number: { density: { enable: true, area: 800 }, value: 80 },
                opacity: { value: 0.3 },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 3 } },
              },
              detectRetina: true,
            }}
          />
        )}

        {/* Background Terminals */}
        {terminalPositions.map((pos, index) => (
          <motion.div
            key={`terminal-${index}`}
            className="absolute bg-black/90 border border-yellow-500/50 rounded-md overflow-hidden z-0"
            style={{
              top: pos.top,
              left: pos.left,
              right: pos.right,
              width: pos.width,
              opacity: pos.opacity * 1.5,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: pos.opacity * 1.5 }}
            transition={{ duration: 1, delay: pos.delay }}
          >
            <div className="bg-gradient-to-r from-yellow-600/60 to-yellow-400/60 px-2 py-0.5 flex items-center">
              <Terminal size={10} className="text-black mr-1" />
              <span className={`${jetBrainsMono.className} text-black text-[8px]`}>AI-PROMPT</span>
            </div>
            <div className="p-2 bg-black/90 text-green-400/90 font-mono text-[8px]">
              <div className="opacity-90">$ prompt&gt;</div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={terminalContents[index]}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-yellow-400/90"
                >
                  <span>{terminalContents[index]}</span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  >
                    _
                  </motion.span>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        ))}

        {/* Animated circuit lines */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[1px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
              style={{
                top: `${5 + i * 6}%`,
                left: 0,
                width: "100%",
                opacity: 0.3 + Math.random() * 0.4,
              }}
              animate={{
                x: [-1000, 1000],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 8 + Math.random() * 10,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.5,
              }}
            />
          ))}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i + 100}
              className="absolute w-[1px] bg-gradient-to-b from-transparent via-yellow-400 to-transparent"
              style={{
                left: `${5 + i * 6}%`,
                top: 0,
                height: "100%",
                opacity: 0.3 + Math.random() * 0.4,
              }}
              animate={{
                y: [-1000, 1000],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 10 + Math.random() * 15,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        {/* Hexagonal grid overlay */}
        <div className="absolute inset-0 bg-[url('/hex-grid.svg')] opacity-10"></div>

        {/* Binary code rain effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`binary-${i}`}
              className={`absolute text-[10px] font-mono text-yellow-500/40 whitespace-nowrap`}
              style={{
                left: `${Math.random() * 100}%`,
              }}
              initial={{ y: -100, opacity: 0 }}
              animate={{
                y: ["-10%", "110%"],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 15,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.7,
                ease: "linear",
              }}
            >
              {Array.from({ length: 20 })
                .map(() => (Math.random() > 0.5 ? "1" : "0"))
                .join(" ")}
            </motion.div>
          ))}
        </div>

        {/* Header with college info */}
        <div className="relative pt-1 px-2 text-center z-10">
          <div className="flex justify-between items-start gap-1">
            {/* PESCE Logo */}
            <motion.div
              className="w-20 h-20 relative flex-shrink-0 mt-[2px]"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/pesce_logo.png"
                alt="PESCE Logo"
                width={95}
                height={95}
                className="object-contain scale-110"
              />
            </motion.div>

            {/* Sri K.V. Shankaragowda */}
            <motion.div
              className="w-18 h-18 relative flex flex-col items-center flex-shrink-0 mt-[2px]"
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative rounded-full border-2 border-yellow-400/30">
                <Image
                  src="/shankaragowda.png"
                  alt="Sri K.V. Shankaragowda"
                  width={70}
                  height={70}
                  className="object-contain rounded-full"
                />
              </div>
              <p className="text-white text-[10px] mt-1 font-medium">Sri K.V. Shankaragowda</p>
              <p className="text-yellow-400 text-[10px] font-medium">Founder</p>
            </motion.div>

            {/* Center Heading */}
            <motion.div
              className={`${orbitron.className} text-center flex-1 mx-0.5`}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-yellow-400 text-[150%] font-semibold mb-0 whitespace-nowrap">
                People's Education Trust (R.)
              </h2>
              <h1 className="text-white text-xl font-bold mb-0 text-center">
                P.E.S College of Engineering, Mandya
              </h1>
              <p className="text-gray-300 text-[11px] leading-snug text-center max-w-sm mx-auto mt-0">
                (An Autonomous Institution under VTU, Belagavi, Aided by the Govt. of Karnataka.)
              </p>
            </motion.div>

            {/* Sri K. S. Vijay Anand */}
            <motion.div
              className="w-18 h-18 relative flex flex-col items-center flex-shrink-0 mt-[2px]"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative rounded-full border-2 border-yellow-400/30">
                <Image
                  src="/vijay_anand.png"
                  alt="Sri K. S. Vijay Anand"
                  width={70}
                  height={70}
                  className="object-contain rounded-full"
                />
              </div>
              <p className="text-white text-[10px] mt-1 font-medium">Sri K. S. Vijay Anand</p>
              <p className="text-yellow-400 text-[10px] font-medium">President</p>
            </motion.div>

            {/* Tachyon Logo */}
            <motion.div
              className="w-20 h-20 relative flex-shrink-0 mt-[2px]"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/tachyon_logo.png"
                alt="Tachyon Club Logo"
                width={99}
                height={99}
                className="object-contain scale-110"
              />
            </motion.div>
          </div>

          <motion.p
            className={`${orbitron.className} text-yellow-400 text-lg font-semibold mt-0`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Tachyon Community Club
          </motion.p>
        </div>

        {/* Main Title with Futuristic Frame */}
        <motion.div
          className="relative mt-8 mx-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="relative border-4 border-yellow-500 bg-black/80 p-6 rounded-lg overflow-hidden">
            {/* Animated corner brackets */}
            <motion.div
              className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-yellow-500"
              animate={{ rotate: [0, 5, 0], x: [0, 2, 0], y: [0, 2, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            />
            <motion.div
              className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-yellow-500"
              animate={{ rotate: [0, -5, 0], x: [0, -2, 0], y: [0, 2, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-yellow-500"
              animate={{ rotate: [0, -5, 0], x: [0, 2, 0], y: [0, -2, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-yellow-500"
              animate={{ rotate: [0, 5, 0], x: [0, -2, 0], y: [0, -2, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            />

            {/* Animated glitch effect */}
            <motion.div
              className="absolute inset-0 bg-yellow-500/20"
              animate={{
                opacity: [0, 0.2, 0],
                height: ["0%", "5%", "0%"],
                y: ["0%", "100%", "0%"],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />

            {/* Title */}
            <div className="relative z-10">
              <motion.div
                className="flex justify-center items-center mb-2"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <Sparkles className="text-yellow-400 mr-2" size={24} />
                <h1 className={`${orbitron.className} text-center text-7xl font-black text-white tracking-wider`}>
                  <motion.span
                    className="inline-block"
                    animate={{
                      textShadow: [
                        "0 0 10px rgba(255, 215, 0, 0.7)",
                        "0 0 20px rgba(255, 215, 0, 0.9)",
                        "0 0 10px rgba(255, 215, 0, 0.7)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    PROMPT
                  </motion.span>
                  <br />
                  <motion.span
                    className="inline-block text-yellow-400"
                    animate={{
                      textShadow: [
                        "0 0 10px rgba(255, 215, 0, 0.7)",
                        "0 0 20px rgba(255, 215, 0, 0.9)",
                        "0 0 10px rgba(255, 215, 0, 0.7)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                  >
                    WARS
                  </motion.span>
                </h1>
                <Sparkles className="text-yellow-400 ml-2" size={24} />
              </motion.div>

              <motion.h2
                className={`${spaceGrotesk.className} text-center text-2xl text-yellow-400 font-bold relative z-10`}
                animate={{
                  y: [0, -3, 0],
                  textShadow: [
                    "0 0 5px rgba(255, 215, 0, 0.3)",
                    "0 0 10px rgba(255, 215, 0, 0.6)",
                    "0 0 5px rgba(255, 215, 0, 0.3)",
                  ],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              >
                AI-Powered Prompt Engineering Challenge
              </motion.h2>
            </div>

            {/* Animated code snippets in background */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-xs text-yellow-500 font-mono whitespace-nowrap"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    x: [0, Math.random() * 100 - 50],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.5,
                  }}
                >
                  {`function generatePrompt() { return AI.optimize(input); }`}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Prize Info with Animated Elements */}
        <motion.div
          className="relative mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.div
            className="relative inline-block"
            animate={{
              rotate: [-1, 1, -1],
              scale: [0.98, 1.02, 0.98],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          >
            <h2 className={`${orbitron.className} text-4xl text-white tracking-widest mb-1`}>PRIZE WORTH</h2>

            <div className="relative inline-block">
              <motion.div
                className="absolute -inset-1 rounded-lg bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 opacity-75 blur-sm"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scale: [0.98, 1.02, 0.98],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />

              <motion.h1
                className={`${orbitron.className} text-8xl font-black text-yellow-400 relative`}
                animate={{
                  textShadow: [
                    "0 0 10px rgba(255, 215, 0, 0.7)",
                    "0 0 20px rgba(255, 215, 0, 0.9)",
                    "0 0 10px rgba(255, 215, 0, 0.7)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                10K
              </motion.h1>
            </div>
          </motion.div>

          {/* Animated date with tech elements */}
          <div className="relative mt-2">
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
              animate={{ opacity: [0.3, 0.7, 0.3], width: ["30%", "40%", "30%"] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            />

            <motion.div className="flex justify-center items-center gap-2">
              <Cpu size={16} className="text-yellow-400" />
              <h3 className={`${spaceGrotesk.className} text-2xl text-white`}>8th May 2025, 09:00 AM</h3>
              <Cpu size={16} className="text-yellow-400" />
            </motion.div>

            <motion.div
              className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
              animate={{ opacity: [0.3, 0.7, 0.3], width: ["30%", "40%", "30%"] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
            />
          </div>
        </motion.div>

        {/* Event Details with AI-themed Icons */}
        <motion.div
          className="relative mt-6 px-8 grid grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {/* Left Column - Event Details and Contact Info */}
          <div className="text-white">
            <div className="flex items-center mb-3">
              <div className="w-1 h-8 bg-yellow-400 mr-2"></div>
              <h3 className={`${orbitron.className} text-xl text-yellow-400 font-bold`}>EVENT DETAILS</h3>
            </div>

            <div className={`${spaceGrotesk.className} space-y-4 border-l border-yellow-400/30 pl-4`}>
              <motion.div className="flex items-center" whileHover={{ x: 5, color: "#FFD700" }}>
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-400/20 mr-2">
                  <span className="text-yellow-400">📅</span>
                </span>
                <span>8th May 2025, 09:00 AM</span>
              </motion.div>

              <motion.div className="flex items-center" whileHover={{ x: 5, color: "#FFD700" }}>
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-400/20 mr-2">
                  <span className="text-yellow-400">📍</span>
                </span>
                <span>AI & ML Lab, PESCE, Mandya</span>
              </motion.div>

              <div className="mt-6">
                <div className="flex items-center mb-3">
                  <div className="w-1 h-6 bg-yellow-400 mr-2"></div>
                  <h3 className={`${orbitron.className} text-lg text-yellow-400 font-bold`}>CONTACT</h3>
                </div>

                <motion.div className="flex items-center" whileHover={{ x: 5, color: "#FFD700" }}>
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-400/20 mr-2">
                    <span className="text-yellow-400">📞</span>
                  </span>
                  <span>Hardik Jain : +91 63606 79655</span>
                </motion.div>

                <motion.div className="flex items-center mt-2" whileHover={{ x: 5, color: "#FFD700" }}>
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-400/20 mr-2">
                    <span className="text-yellow-400">📞</span>
                  </span>
                  <span>Vikas RP : +91 87920 69009</span>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Right Column - Registration QR */}
          <div className="text-center">
            <div className="flex items-center mb-3 justify-center">
              <div className="w-1 h-8 bg-yellow-400 mr-2"></div>
              <h3 className={`${orbitron.className} text-xl text-yellow-400 font-bold`}>REGISTRATIONS OPEN</h3>
              <div className="w-1 h-8 bg-yellow-400 ml-2"></div>
            </div>

            <div className="relative">
              {/* Animated QR frame */}
              <motion.div
                className="absolute -inset-2 rounded-lg bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 opacity-75"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  rotate: [0, 1, 0, -1, 0],
                }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
              />

              <div className="relative w-40 h-40 mx-auto bg-white p-2 overflow-hidden">
                {/* Placeholder QR code */}
                <Image
                  src="/placeholder.svg?height=150&width=150"
                  alt="Registration QR Code"
                  width={150}
                  height={150}
                  className="object-contain"
                />

                {/* Animated scanning effect */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-3 bg-green-500/30"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />

                {/* Corner markers */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>
              </div>
            </div>

            <motion.p
              className={`${spaceGrotesk.className} text-white mt-3 text-sm`}
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <span className="text-yellow-400 font-bold">Scan to Register</span>
              <br />
              Entry Fee: ₹100 per team
            </motion.p>
          </div>
        </motion.div>

        {/* Event Rounds with AI Icons */}
        <motion.div
          className="relative mt-6 px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
        >
          <div className="bg-black/70 border border-yellow-400/50 p-4 rounded-lg relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i + 200}
                  className="absolute bg-yellow-400/5 rounded-full"
                  style={{
                    width: `${10 + Math.random() * 20}px`,
                    height: `${10 + Math.random() * 20}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0, 0.5, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              <div className="flex items-center mb-3">
                <BrainCircuit size={20} className="text-yellow-400 mr-2" />
                <h3 className={`${orbitron.className} text-xl text-yellow-400 font-bold`}>EVENT ROUNDS</h3>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <motion.div
                  className="bg-black/80 border border-yellow-400/30 p-3 rounded-lg"
                  whileHover={{ scale: 1.03, borderColor: "rgba(255, 215, 0, 0.8)" }}
                >
                  <div className="flex items-center mb-2">
                    <Sparkles size={16} className="text-yellow-400 mr-2" />
                    <h4 className={`${spaceGrotesk.className} text-yellow-400 font-bold`}>ROUND 1</h4>
                  </div>
                  <p className={`${spaceGrotesk.className} text-white text-sm`}>Best Image Generation</p>
                </motion.div>

                <motion.div
                  className="bg-black/80 border border-yellow-400/30 p-3 rounded-lg"
                  whileHover={{ scale: 1.03, borderColor: "rgba(255, 215, 0, 0.8)" }}
                >
                  <div className="flex items-center mb-2">
                    <Code size={16} className="text-yellow-400 mr-2" />
                    <h4 className={`${spaceGrotesk.className} text-yellow-400 font-bold`}>ROUND 2</h4>
                  </div>
                  <p className={`${spaceGrotesk.className} text-white text-sm`}>Solve It With A Prompt</p>
                </motion.div>

                <motion.div
                  className="bg-black/80 border border-yellow-400/30 p-3 rounded-lg"
                  whileHover={{ scale: 1.03, borderColor: "rgba(255, 215, 0, 0.8)" }}
                >
                  <div className="flex items-center mb-2">
                    <Bot size={16} className="text-yellow-400 mr-2" />
                    <h4 className={`${spaceGrotesk.className} text-yellow-400 font-bold`}>ROUND 3</h4>
                  </div>
                  <p className={`${spaceGrotesk.className} text-white text-sm`}>Clone This</p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        

        {/* Footer with animated elements */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-black/80 py-3 px-4 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
        >
          <div className="relative">
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
              animate={{ opacity: [0.3, 0.7, 0.3], width: ["30%", "40%", "30%"] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            />

            <p className={`${orbitron.className} text-yellow-400 text-xs`}>
              Organized by Tachyon Community Club | P.E.S College of Engineering, Mandya
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
