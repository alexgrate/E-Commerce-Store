import React, { useState } from 'react';
import { Plus, Minus, Package, Truck, CreditCard, RefreshCw, HelpCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQPage = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleQuestion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqCategories = [
        {
            category: 'Orders & Shipping',
            icon: <Truck size={20} />,
            questions: [
                {
                    question: 'How long does shipping take?',
                    answer: 'Standard shipping within Nigeria takes 3-7 business days. Lagos deliveries typically arrive within 2-3 days. International shipping is currently unavailable, but we\'re working on it!'
                },
                {
                    question: 'Do you offer free shipping?',
                    answer: 'Yes! We offer free standard shipping on all orders over ₦50,000 within Nigeria. Orders under this amount have a flat shipping fee of ₦2,500.'
                },
                {
                    question: 'How can I track my order?',
                    answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also view your order status by logging into your account and visiting the Orders page.'
                },
                {
                    question: 'Can I change my shipping address after placing an order?',
                    answer: 'If your order hasn\'t shipped yet, contact us immediately at hello@hfbrand.com with your order number and new address. Once shipped, we cannot modify the delivery address.'
                },
                {
                    question: 'What happens if my package is lost or damaged?',
                    answer: 'We work with reliable courier partners, but if your package arrives damaged or goes missing, contact us within 48 hours with photos (if damaged) and your order number. We\'ll resolve it immediately.'
                }
            ]
        },
        {
            category: 'Returns & Exchanges',
            icon: <RefreshCw size={20} />,
            questions: [
                {
                    question: 'What is your return policy?',
                    answer: 'We accept returns within 14 days of delivery for unworn, unwashed items with original tags attached. Items must be in their original condition. Sale items and customized pieces cannot be returned.'
                },
                {
                    question: 'How do I start a return or exchange?',
                    answer: 'Email us at hello@hfbrand.com with your order number, the item(s) you want to return, and reason for return. We\'ll send you a return authorization and instructions within 24 hours.'
                },
                {
                    question: 'When will I receive my refund?',
                    answer: 'Refunds are processed within 5-7 business days after we receive and inspect your return. The refund will be issued to your original payment method. Please allow an additional 3-5 days for it to reflect in your account.'
                },
                {
                    question: 'Can I exchange an item for a different size or color?',
                    answer: 'Absolutely! If you need a different size or color, let us know in your return request. We\'ll prioritize shipping your exchange as soon as we receive your return. Exchange shipping is free.'
                },
                {
                    question: 'Who pays for return shipping?',
                    answer: 'For defective items or our error, we cover return shipping costs. For standard returns (wrong size, changed mind), customers are responsible for return shipping fees.'
                }
            ]
        },
        {
            category: 'Payment & Pricing',
            icon: <CreditCard size={20} />,
            questions: [
                {
                    question: 'What payment methods do you accept?',
                    answer: 'We accept all major credit/debit cards (Visa, Mastercard), bank transfers via Flutterwave, and Cash on Delivery (COD) for orders within Lagos. Payment is secure and encrypted.'
                },
                {
                    question: 'Is Cash on Delivery (COD) available?',
                    answer: 'Yes! COD is available for orders within Lagos only. Please have the exact amount ready when our delivery agent arrives. A small COD fee of ₦500 applies.'
                },
                {
                    question: 'Do your prices include tax?',
                    answer: 'All prices displayed on our website are final and include applicable taxes. There are no hidden fees at checkout except shipping (if your order is under ₦50,000).'
                },
                {
                    question: 'Do you offer student or bulk discounts?',
                    answer: 'We occasionally offer promotions and discount codes — follow us on Instagram @hfbrand for exclusive offers. For bulk orders (10+ items), email us at wholesale@hfbrand.com for special pricing.'
                },
                {
                    question: 'Can I use multiple discount codes on one order?',
                    answer: 'No, only one discount code can be applied per order. The system will automatically apply the code that gives you the best savings.'
                }
            ]
        },
        {
            category: 'Products & Sizing',
            icon: <Package size={20} />,
            questions: [
                {
                    question: 'How do I know what size to order?',
                    answer: 'Each product page has a detailed size guide. We recommend measuring yourself and comparing to our size chart. If you\'re between sizes, we suggest sizing up for a more relaxed fit. Still unsure? Email us at hello@hfbrand.com!'
                },
                {
                    question: 'Are your clothes true to size?',
                    answer: 'Most of our pieces run true to size, but some items are designed for an oversized fit. Always check the product description and size guide on each product page for specific fit notes.'
                },
                {
                    question: 'What materials are your clothes made from?',
                    answer: 'We use premium materials including 100% cotton, genuine leather, high-quality polyester blends, and specialty fabrics. Each product page lists the exact material composition and care instructions.'
                },
                {
                    question: 'How do I care for my HF pieces?',
                    answer: 'Care instructions are on each garment\'s label and product page. Generally: machine wash cold, tumble dry low, and avoid bleach. For leather items, spot clean only and store in a cool, dry place.'
                },
                {
                    question: 'Will items that are "Out of Stock" be restocked?',
                    answer: 'Popular items are usually restocked within 2-4 weeks. Click "Notify Me" on the product page to get an email when it\'s back. Limited edition pieces may not return, so act fast!'
                }
            ]
        },
        {
            category: 'Account & Orders',
            icon: <HelpCircle size={20} />,
            questions: [
                {
                    question: 'Do I need an account to place an order?',
                    answer: 'While you can checkout as a guest, we highly recommend creating an account. This lets you track orders, save addresses, view order history, and get early access to new drops and sales.'
                },
                {
                    question: 'How do I reset my password?',
                    answer: 'Click "Login" at the top of the page, then "Forgot Password". Enter your email and we\'ll send you a reset link. Check your spam folder if you don\'t see it within 5 minutes.'
                },
                {
                    question: 'Can I cancel or modify my order?',
                    answer: 'You can cancel or modify your order within 2 hours of placing it by contacting us immediately at hello@hfbrand.com with your order number. After that, orders are processed and cannot be changed.'
                },
                {
                    question: 'Why was my order cancelled?',
                    answer: 'Orders may be cancelled due to payment issues, stock unavailability, or address verification problems. We\'ll always email you with the specific reason and next steps.'
                },
                {
                    question: 'How do I update my account information?',
                    answer: 'Log into your account and go to "Profile" to update your name, phone, email, and saved addresses. Email changes require verification for security.'
                }
            ]
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero */}
            <div className="bg-black text-white pt-40 pb-24 px-4 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.4em] text-gray-500 mb-6">
                    Help Center
                </p>
                <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
                    FAQ
                </h1>
                <p className="mt-6 text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    Everything you need to know about shopping with HF. Can't find what you're looking for? 
                    <Link to="/contact" className="underline hover:text-white ml-1">Contact us</Link>.
                </p>
            </div>

            {/* FAQ Content */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="space-y-16">
                    {faqCategories.map((category, categoryIndex) => (
                        <div key={categoryIndex}>
                            {/* Category Header */}
                            <div className="flex items-center gap-3 mb-8 pb-4 border-b-2 border-black">
                                <div className="w-10 h-10 bg-black text-white flex items-center justify-center">
                                    {category.icon}
                                </div>
                                <h2 className="text-2xl font-black uppercase tracking-tight">
                                    {category.category}
                                </h2>
                            </div>

                            {/* Questions */}
                            <div className="space-y-4">
                                {category.questions.map((item, questionIndex) => {
                                    const globalIndex = `${categoryIndex}-${questionIndex}`;
                                    const isOpen = openIndex === globalIndex;

                                    return (
                                        <div
                                            key={questionIndex}
                                            className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-400 transition-colors"
                                        >
                                            {/* Question Button */}
                                            <button
                                                onClick={() => toggleQuestion(globalIndex)}
                                                className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors"
                                            >
                                                <span className="font-bold text-sm sm:text-base pr-8">
                                                    {item.question}
                                                </span>
                                                <div className="flex shrink-0">
                                                    {isOpen ? (
                                                        <Minus size={20} className="text-black" />
                                                    ) : (
                                                        <Plus size={20} className="text-gray-400" />
                                                    )}
                                                </div>
                                            </button>

                                            {/* Answer */}
                                            <div
                                                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                                    isOpen ? 'max-h-96' : 'max-h-0'
                                                }`}
                                            >
                                                <div className="px-6 pb-6 pt-2 text-sm text-gray-600 leading-relaxed bg-gray-50 border-t border-gray-200">
                                                    {item.answer}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Still Have Questions CTA */}
                <div className="mt-24 bg-black text-white p-12 text-center rounded-lg">
                    <Mail size={48} className="mx-auto mb-6 text-gray-400" />
                    <h3 className="text-2xl font-black uppercase tracking-tight mb-4">
                        Still Have Questions?
                    </h3>
                    <p className="text-sm text-gray-400 mb-8 max-w-md mx-auto">
                        Our team is here to help. Get in touch and we'll respond within 24 hours.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-block bg-white text-black px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
                    >
                        Contact Support
                    </Link>
                </div>

                {/* Quick Links */}
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <Link
                        to="/account"
                        className="border border-gray-200 p-6 text-center hover:border-black transition-colors group"
                    >
                        <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 group-hover:text-black transition-colors">
                            My Account
                        </div>
                        <div className="text-sm">Track Orders & Returns</div>
                    </Link>

                    <Link
                        to="/Shop"
                        className="border border-gray-200 p-6 text-center hover:border-black transition-colors group"
                    >
                        <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 group-hover:text-black transition-colors">
                            Shop
                        </div>
                        <div className="text-sm">Browse Latest Collection</div>
                    </Link>

                    <a href="mailto:hello@hfbrand.com" className="border border-gray-200 p-6 text-center hover:border-black transition-colors group">
                        <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 group-hover:text-black transition-colors">
                            Email Us
                        </div>
                        <div className="text-sm">hello@hfbrand.com</div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FAQPage;