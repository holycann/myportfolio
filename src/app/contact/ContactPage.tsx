"use client";

import React, { useState, useCallback, FormEvent, ChangeEvent } from "react";
import emailjs from "@emailjs/browser";
import { toast, Toaster } from "react-hot-toast";
import {
  FaCheck,
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

/**
 * Form data interface for contact form
 */
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
  subject: string;
}

/**
 * Configuration for Contact page
 * Centralizes form and UI settings
 */
const CONTACT_CONFIG = {
  socialLinks: [
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/muhamad-ramadhan-bb6289237/",
      label: "LinkedIn",
    },
    {
      icon: FaGithub,
      href: "https://github.com/holycann",
      label: "GitHub",
    },
    {
      icon: FaInstagram,
      href: "https://instagram.com/ehhramaa_",
      label: "Instagram",
    },
  ],
  styling: {
    container:
      "container mx-auto max-w-xs xs:max-w-md lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl min-h-screen flex items-center justify-center lg:mt-10",
    gridLayout:
      "grid grid-cols-1 md:grid-cols-2 lg:gap-6 md:gap-12 bg-[var(--color-bg-secondary)]/30 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl",
  },
  validation: {
    emailRegex: /\S+@\S+\.\S+/,
  },
};

/**
 * Contact page component
 * Handles client-side form submission and interactions
 */
export default function ContactPage() {
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

  // Validate form data
  const validateForm = useCallback(() => {
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!CONTACT_CONFIG.validation.emailRegex.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Handle form input changes
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    },
    [errors]
  );

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      if (!validateForm()) {
        toast.error("Please fill in all required fields correctly");
        return;
      }

      setIsSubmitting(true);

      try {
        // Send email via EmailJS
        await emailjs.send(
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
    },
    [formData, validateForm]
  );

  return (
    <div id="contact" className={CONTACT_CONFIG.styling.container}>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "var(--color-bg-secondary)",
            color: "var(--color-text-primary)",
          },
        }}
      />
      <div className={CONTACT_CONFIG.styling.gridLayout}>
        {/* Left Column - Contact Information */}
        <div className="bg-gradient-to-br from-[var(--color-primary-dark)] to-[var(--color-bg-primary)] p-6 md:p-12 flex flex-col justify-center space-y-4 md:space-y-8">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-[var(--color-text-secondary)]">
            Get in Touch
          </h2>

          <p className="text-xs xs:text-base text-[var(--color-text-muted)] lg:mb-6">
            Interested in collaborating on innovative tech projects or
            discussing potential opportunities? Let&apos;s connect and explore
            how we can create something amazing together.
          </p>

          <div className="space-y-4 hidden md:block">
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-2xl text-[var(--color-accent)]" />
              <span className="text-xs xs:text-base text-[var(--color-text-secondary)]">
                muhamad.ramadhan.dev@gmail.com
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-2xl text-[var(--color-accent)]" />
              <span className="text-xs xs:text-base text-[var(--color-text-secondary)]">
                Indonesia, West Java
              </span>
            </div>
          </div>

          <div className="hidden xs:flex space-x-4 xl:mt-6">
            {CONTACT_CONFIG.socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors duration-300 transform hover:scale-110"
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
                  className={`w-full p-3 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] ${
                    errors.firstName
                      ? "border-2 border-[var(--color-error)]"
                      : ""
                  }`}
                />
                {errors.firstName && (
                  <p className="text-[var(--color-error)] text-xs mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-3 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                />
              </div>
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] ${
                errors.email ? "border-2 border-[var(--color-error)]" : ""
              }`}
            />
            {errors.email && (
              <p className="text-[var(--color-error)] text-xs mt-1">
                {errors.email}
              </p>
            )}

            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number (Optional)"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-3 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className={`w-full p-3 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] ${
                errors.message ? "border-2 border-[var(--color-error)]" : ""
              }`}
            />
            {errors.message && (
              <p className="text-[var(--color-error)] text-xs mt-1">
                {errors.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full p-3 bg-[var(--color-accent)] text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-accent-dark)] transition-colors duration-300 flex items-center justify-center space-x-2"
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
  );
}
