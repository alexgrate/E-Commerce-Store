import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, Send } from 'lucide-react';

const ContactPage = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate sending — hook this up to your backend or EmailJS later
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
            setForm({ name: '', email: '', subject: '', message: '' });
        }, 1500);
    };

    return (
        <div className="bg-white min-h-screen">

            {/* Hero */}
            <div className="bg-black text-white pt-40 pb-24 px-4 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.4em] text-gray-500 mb-6">
                    Get In Touch
                </p>
                <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter leading-none">
                    Contact Us
                </h1>
                <p className="mt-6 text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
                    Have a question about an order, a product, or just want to talk? We're always here.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Left - Contact Info */}
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.4em] text-gray-400 mb-6">
                            Our Details
                        </p>
                        <h2 className="text-3xl font-black uppercase tracking-tighter mb-12">
                            Let's Talk
                        </h2>

                        <div className="space-y-10">
                            {/* Email */}
                            <div className="flex items-start gap-5">
                                <div className="w-12 h-12 bg-black text-white flex items-center justify-center shrink-0">
                                    <Mail size={18} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Email</p>
                                    <a href="mailto:hello@hfbrand.com" className="text-sm font-medium hover:underline">
                                        hello@hfbrand.com
                                    </a>
                                    <p className="text-xs text-gray-400 mt-1">We reply within 24 hours</p>
                                </div>
                            </div>

                            {/* Phone  */}
                            <div className="flex items-start gap-5">
                                <div className="w-12 h-12 bg-black text-white flex items-center justify-center shrink-0">
                                    <Phone size={18} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Phone</p>
                                    <a href="tel:+2348000000000" className="text-sm font-medium hover:underline">
                                        +234 800 000 0000
                                    </a>
                                    <p className="text-xs text-gray-400 mt-1">Mon – Sat, 9am – 6pm</p>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-start gap-5">
                                <div className="w-12 h-12 bg-black text-white flex items-center justify-center shrink-0">
                                    <MapPin size={18} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Location</p>
                                    <p className="text-sm font-medium">Lagos, Nigeria</p>
                                    <p className="text-xs text-gray-400 mt-1">Visit by appointment only</p>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-200 my-12"></div>

                        {/* Social */}
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
                                Follow Us
                            </p>
                            <div className="flex gap-4">
                                {[
                                    { icon: <Instagram size={18} />, label: 'Instagram', href: '#' },
                                    { icon: <Twitter size={18} />, label: 'Twitter', href: '#' },
                                    { icon: <Facebook size={18} />, label: 'Facebook', href: '#' },
                                ].map((social) => (
                                    <a key={social.label} href={social.href} className="w-12 h-12 border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all" title={social.label}>
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* FAQ Note */}
                        <div className="mt-12 bg-gray-50 border border-gray-200 p-6">
                            <p className="text-xs font-bold uppercase tracking-widest mb-2">Order Enquiries</p>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                For questions about an existing order, please include your order number 
                                (e.g. #ORD-123) in your message so we can help you faster.
                            </p>
                        </div>
                    </div>

                    {/* Right - Contact Form */}
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.4em] text-gray-400 mb-6">
                            Send A Message
                        </p>
                        <h2 className="text-3xl font-black uppercase tracking-tighter mb-12">
                            Write To Us
                        </h2>

                        {submitted ? (
                            // Success State
                            <div className="border border-gray-200 p-12 text-center">
                                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Send size={24} />
                                </div>
                                <h3 className="font-black uppercase tracking-widest text-lg mb-3">
                                    Message Sent!
                                </h3>
                                <p className="text-sm text-gray-500 mb-8">
                                    Thanks for reaching out. We'll get back to you within 24 hours.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="text-xs font-bold uppercase tracking-widest underline hover:no-underline"
                                >
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            // Form
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-600 mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Your name"
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-600 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="your@email.com"
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-600 mb-2">
                                        Subject
                                    </label>
                                    <select
                                        name="subject"
                                        value={form.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors text-sm bg-white"
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="Order Enquiry">Order Enquiry</option>
                                        <option value="Product Question">Product Question</option>
                                        <option value="Return / Exchange">Return / Exchange</option>
                                        <option value="Wholesale">Wholesale</option>
                                        <option value="Press / Media">Press / Media</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-600 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="Write your message here..."
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors text-sm resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-r-transparent rounded-full animate-spin"></div>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <Send size={14} />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;