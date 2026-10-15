import React, { useState } from "react";
import { Send, MapPin, Mail } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Validate form
  const validateForm = () => {
    const tempErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      tempErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.subject.trim()) {
      tempErrors.subject = "Subject is required";
      isValid = false;
    }

    if (!formData.message.trim()) {
      tempErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(tempErrors);

    return isValid;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setStatus("Please fill in all required fields correctly.");
      return;
    }

    setIsSending(true);
    setStatus("Sending...");

    try {
      const form = new FormData();

      // Web3Forms Access Key
      form.append(
        "access_key",
        "2ed2d9ed-8704-41e1-b003-f30d4dbb3a79"
      );

      // Form data
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("subject", formData.subject);
      form.append("message", formData.message);

      // Email yang akan digunakan ketika Anda menekan Reply
      form.append("replyto", formData.email);

      // Nama pengirim
      form.append(
        "from_name",
        `${formData.name} - Portfolio Contact`
      );

      // Kirim ke Web3Forms
      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          body: form,
        }
      );

      const result = await response.json();

      if (result.success) {
        setStatus("Message sent successfully!");

        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });

        setErrors({});
      } else {
        setStatus(
          result.message ||
            "There was an error sending your message."
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);

      setStatus(
        "An error occurred. Please check your internet connection and try again."
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="pt-20 lg:pt-[0rem] bg-[#04081A] text-white min-h-screen">
      <section className="hero min-h-screen flex items-center relative px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Get in Touch
                </h2>

                <p className="text-gray-300 text-lg">
                  Have a question or want to work together?
                  Drop me a message!
                </p>
              </div>

              <div className="space-y-6">

                {/* Email */}
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-500/10 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-purple-400" />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Email
                    </h3>

                    <p className="text-gray-400">
                      andhung11@gmail.com
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-4">
                  <div className="bg-pink-500/10 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-pink-400" />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Location
                    </h3>

                    <p className="text-gray-400">
                      Surabaya, Indonesia
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Contact Form */}
            <div className="backdrop-blur-lg bg-white/5 p-8 rounded-2xl shadow-xl">

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-6">

                  {/* Name */}
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      disabled={isSending}
                      className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                        errors.name
                          ? "border-red-500"
                          : "border-gray-700"
                      } focus:border-blue-500 focus:outline-none transition-colors disabled:opacity-50`}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        })
                      }
                    />

                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      disabled={isSending}
                      className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                        errors.email
                          ? "border-red-500"
                          : "border-gray-700"
                      } focus:border-blue-500 focus:outline-none transition-colors disabled:opacity-50`}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                    />

                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      disabled={isSending}
                      className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                        errors.subject
                          ? "border-red-500"
                          : "border-gray-700"
                      } focus:border-blue-500 focus:outline-none transition-colors disabled:opacity-50`}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          subject: e.target.value,
                        })
                      }
                    />

                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      rows="4"
                      value={formData.message}
                      disabled={isSending}
                      className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                        errors.message
                          ? "border-red-500"
                          : "border-gray-700"
                      } focus:border-blue-500 focus:outline-none transition-colors resize-none disabled:opacity-50`}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          message: e.target.value,
                        })
                      }
                    />

                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSending ? (
                    <>
                      <span className="animate-pulse">
                        Sending...
                      </span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Status Message */}
              {status && (
                <div
                  className={`mt-4 text-center ${
                    status.includes("successfully")
                      ? "text-green-400"
                      : status === "Sending..."
                      ? "text-blue-400"
                      : "text-red-400"
                  }`}
                >
                  <p>{status}</p>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}