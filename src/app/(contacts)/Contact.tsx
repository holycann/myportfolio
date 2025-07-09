"use client";

import emailjs from "emailjs-com";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import {
  FaCheck,
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaTwitter
} from "react-icons/fa";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
  subject: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
    subject: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    setIsSubmitting(true);

    try {
      // Kirim email via EmailJS
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          firstname: formData.firstName,
          lastname: formData.lastName,
          email: formData.email,
          phone: formData.phoneNumber,
          message: formData.message,
          subject: formData.subject,
          time: new Date().toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setIsSubmitted(true);
      toast.success("Message sent successfully!");

      // Reset form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        message: "",
        subject: "",
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setIsSubmitted(false), 2000);
    }
  };

  const socialLinks = [
    { 
      icon: FaLinkedin, 
      href: 'https://www.linkedin.com/in/muhamad-ramadhan-bb6289237/', 
      label: 'LinkedIn' 
    },
    { 
      icon: FaGithub, 
      href: 'https://github.com/holycann', 
      label: 'GitHub' 
    },
    { 
      icon: FaInstagram, 
      href: 'https://instagram.com/ehhramaa_', 
      label: 'Instagram' 
    },
  ];

  return (
    <div
      id="contact"
      className="lg:min-h-screen lg:mx-10 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A] text-white py-10 lg:py-20 px-4 lg:px-10"
    >
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 bg-[#1A1A1A]/30 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl">
          {/* Left Column - Contact Information */}
          <div className="bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] p-6 md:p-12 flex flex-col justify-center space-y-4 md:space-y-8">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white">
              Get in Touch
            </h2>

            <p className="text-sm md:text-base text-gray-400 mb-6">
              Interested in collaborating on innovative tech projects or
              discussing potential opportunities? Let&apos;s connect and explore
              how we can create something amazing together.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <FaEnvelope className="text-2xl text-cyan-500" />
                <span className="text-sm md:text-base">muhamad.ramadhan.dev@gmail.com</span>
              </div>
              <div className="flex items-center space-x-4">
                <FaMapMarkerAlt className="text-2xl text-cyan-500" />
                <span className="text-sm md:text-base">Indonesia, West Java</span>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
                  aria-label={label}
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="p-6 md:p-12 flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full p-3 bg-[#2A2A2A] rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                      errors.firstName ? 'border-2 border-red-500' : ''
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full p-3 bg-[#2A2A2A] rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 bg-[#2A2A2A] rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                  errors.email ? 'border-2 border-red-500' : ''
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}

              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number (Optional)"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-3 bg-[#2A2A2A] rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />

              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className={`w-full p-3 bg-[#2A2A2A] rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                  errors.message ? 'border-2 border-red-500' : ''
                }`}
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">{errors.message}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full p-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : isSubmitted ? (
                  <>
                    <FaCheck className="mr-2" /> Sent
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="mr-2" /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
