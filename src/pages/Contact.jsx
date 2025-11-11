import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "", subject: "general" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setIsSubmitting(false);
  }

  const subjects = [
    { value: "general", label: "General Inquiry", icon: "💬" },
    { value: "support", label: "Technical Support", icon: "🛠️" },
    { value: "feature", label: "Feature Request", icon: "✨" },
    { value: "bug", label: "Bug Report", icon: "🐛" },
    { value: "partnership", label: "Partnership", icon: "🤝" },
  ];

  const contactMethods = [
    { 
      title: "Chat with us", 
      description: "Get instant help from our support team", 
      icon: "💬", 
      action: "Start Chat",
      color: "primary"
    },
    { 
      title: "Email Support", 
      description: "Send us an email and we'll respond within 24h", 
      icon: "📧", 
      action: "Send Email",
      color: "secondary"
    },
    { 
      title: "Community", 
      description: "Join our community for discussions", 
      icon: "👥", 
      action: "Join Community",
      color: "accent"
    },
  ];

  const faqs = [
    {
      question: "How does the smart task prioritization work?",
      answer: "Our AI algorithm considers your energy level, task priorities, due dates, and completion history to suggest the optimal task order for maximum productivity."
    },
    {
      question: "Can I sync my tasks across devices?",
      answer: "Yes! All your tasks are automatically synced across all your devices through our cloud infrastructure."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use industry-standard encryption and security practices to protect your data. Your privacy is our top priority."
    },
    {
      question: "Do you offer a mobile app?",
      answer: "Our web app is fully responsive and works great on mobile. A dedicated mobile app is planned for future release."
    },
  ];

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mesh">
        <div className="max-w-md w-full text-center animate-fadeInUp">
          <div className="card-elevated rounded-3xl p-8 backdrop-blur-lg">
            <div className="w-20 h-20 bg-gradient-to-r from-success-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-gentle">
              <span className="text-3xl">✅</span>
            </div>
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-gray-100 mb-4">
              Message Sent!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Thank you for reaching out! We'll get back to you within 24 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="btn-primary px-6 py-3 rounded-2xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mesh">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <h1 className="text-5xl lg:text-6xl font-display font-bold text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Have questions about EduSync? We're here to help you succeed in your educational journey.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="card-elevated rounded-3xl p-8 text-center hover:scale-105 transition-all duration-300 animate-fadeInUp backdrop-blur-lg"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${
                method.color === 'primary' ? 'from-primary-500 to-primary-600' :
                method.color === 'secondary' ? 'from-secondary-500 to-secondary-600' :
                'from-accent-500 to-accent-600'
              } rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <span className="text-2xl">{method.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {method.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {method.description}
              </p>
              <button className={`${
                method.color === 'primary' ? 'btn-primary' :
                method.color === 'secondary' ? 'btn-secondary' : 'btn-accent'
              } w-full py-3 rounded-2xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300`}>
                {method.action}
              </button>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <div className="animate-fadeInUp">
            <div className="card-elevated rounded-3xl p-8 backdrop-blur-lg">
              <div className="mb-8">
                <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Send us a message
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Subject Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                    What can we help you with?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {subjects.map((subject) => (
                      <label
                        key={subject.value}
                        className={`flex items-center space-x-3 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                          form.subject === subject.value
                            ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                            : "border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600"
                        }`}
                      >
                        <input
                          type="radio"
                          name="subject"
                          value={subject.value}
                          checked={form.subject === subject.value}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <span className="text-xl">{subject.icon}</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                          {subject.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      Your Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        className="form-input w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                      </div>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="form-input w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell us how we can help you..."
                    rows={6}
                    className="form-input w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm resize-none"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                  <div className="text-right text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {form.message.length}/500 characters
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-4 rounded-2xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting && <div className="loader"></div>}
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                  {!isSubmitting && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="animate-fadeInUp">
            <div className="card-elevated rounded-3xl p-8 backdrop-blur-lg">
              <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-gray-100 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0 last:pb-0">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-primary-50 dark:bg-primary-900/20 rounded-2xl border border-primary-200 dark:border-primary-800">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <span className="text-2xl">💡</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-700 dark:text-primary-300 mb-1">
                      Can't find what you're looking for?
                    </h4>
                    <p className="text-primary-600 dark:text-primary-400 text-sm">
                      Check out our comprehensive documentation or reach out to our support team for personalized help.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-16 text-center animate-fadeInUp">
          <div className="inline-flex items-center space-x-8 text-white/70">
            <div className="flex items-center space-x-2">
              <span>📍</span>
              <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>⏰</span>
              <span>Mon-Fri 9AM-6PM PST</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🌍</span>
              <span>Global Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
