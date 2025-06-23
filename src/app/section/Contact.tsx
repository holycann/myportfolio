"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { FaTwitter, FaInstagram, FaDiscord, FaClock, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission here
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A] text-white py-20 rounded-3xl">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-[#1A1A1A]/30 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Left Column - Contact Information */}
          <motion.div 
            variants={containerVariants}
            className="bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] p-12 flex flex-col justify-center space-y-8 rounded-l-3xl"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl font-bold mb-4"
            >
              Get in Touch
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-gray-400 mb-6"
            >
              Interested in collaborating on innovative tech projects or discussing potential opportunities? Let&apos;s connect and explore how we can create something amazing together.
            </motion.p>

            <motion.div 
              variants={containerVariants}
              className="space-y-6"
            >
              <motion.div 
                variants={itemVariants}
                className="flex items-center space-x-4"
              >
                <FaClock className="text-2xl text-blue-500" />
                <div>
                  <h4 className="font-semibold">Availability</h4>
                  <p className="text-gray-400">Weekdays: 9 AM - 6 PM (GMT+7)</p>
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="flex items-center space-x-4"
              >
                <FaMapMarkerAlt className="text-2xl text-green-500" />
                <div>
                  <h4 className="font-semibold">Location</h4>
                  <p className="text-gray-400">Bekasi, West Java, Indonesia</p>
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="flex items-center space-x-4"
              >
                <FaEnvelope className="text-2xl text-purple-500" />
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-gray-400">muhamad.ramadhan.dev@gmail.com</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="flex space-x-5 mt-8"
            >
              <a href="https://twitter.com/muhamadramadhan" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com/muhamadramadhan" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="https://discordapp.com/users/muhamadramadhan" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FaDiscord size={24} />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div 
            variants={containerVariants}
            className="p-12 flex flex-col justify-center rounded-r-3xl"
          >
            <motion.form 
              onSubmit={handleSubmit} 
              variants={containerVariants}
              className="space-y-6"
            >
              <motion.div 
                variants={containerVariants}
                className="grid grid-cols-2 gap-6"
              >
                <motion.div variants={itemVariants}>
                  <label className="block text-sm text-gray-400 mb-2">First name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px] placeholder-gray-600"
                    placeholder="Muhamad"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label className="block text-sm text-gray-400 mb-2">Last name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px] placeholder-gray-600"
                    placeholder="Ramadhan"
                  />
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px] placeholder-gray-600"
                  placeholder="muhamad.ramadhan.dev@gmail.com"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm text-gray-400 mb-2">Phone number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px] placeholder-gray-600"
                  placeholder="+628172636451"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm text-gray-400 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full p-3 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px] placeholder-gray-600 resize-none"
                  placeholder="Hey i have some interesting project for you..."
                />
              </motion.div>

              <motion.button
                variants={itemVariants}
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-[15px] font-semibold transition-colors"
              >
                Send message
              </motion.button>
            </motion.form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
