import React, { useState, useEffect, useRef } from 'react';
import {
    Mail, User, Briefcase, Star, Folder, Menu, X, Send, Linkedin, Phone,
    Award, Target, Megaphone, ShoppingCart, UserCheck, Building, LineChart,
    Camera, GraduationCap, ArrowRight, Palette, Code, BarChart3,
    Tiktok, Instagram, Dribbble, Twitter
} from 'lucide-react';
import { motion, AnimatePresence, useInView, useSpring, useTransform } from 'framer-motion';

// --- MOCK UI COMPONENTS ---
// Recreating basic structure and styling of UI library components with Tailwind CSS.
const Button = ({ children, className, ...props }) => (
  <button className={`px-6 py-3 font-semibold rounded-lg transition-all duration-300 ease-in-out ${className}`} {...props}>
    {children}
  </button>
);

const Card = ({ children, className, ...props }) => (
  <div className={`bg-neutral-900/80 border border-neutral-800 rounded-xl shadow-lg ${className}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className, ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);


// --- DATA CONFIGURATION ---
// Central place for easy updates to portfolio content.

const personalInfo = {
    name: "Abdullah Rashid",
    // Reordered the title as requested by the user.
    // تم تحديث العنوان بناءً على طلب المستخدم
    title: "Senior Performance Marketer | E-commerce Expert | Certified by Google",
    linkedin: "https://www.linkedin.com/in/abdullah-rashid4444/",
    whatsapp: "http://wa.me/+201025030220",
    // Updated the profile image to the direct URL provided by the user.
    profileImage: "https://i.postimg.cc/RFmtpNSy/Abdullah-Rashid.jpg",
};

const sections = [
    { id: "about", title: "About" },
    { id: "experience", title: "Experience" },
    { id: "skills", title: "Skills" },
    { id: "projects", title: "Projects" },
    { id: "contact", title: "Contact" },
];

const experienceData = [
    // تم تحديث عنوان الخبرة
    { icon: <Award />, title: "Certified Digital Marketing & Ecommerce Expert", company: "Google", description: "Earned 8 certifications covering SMM, SEO, SEM, Email, Ads, Analytics, and Customer Loyalty." },
    { icon: <Megaphone />, title: "Digital Marketing Specialist", company: "Lasers", description: "Helped scale social campaigns for mental health in the Arab world, boosting organic reach beyond internal capacity." },
    { icon: <Target />, title: "Media Buyer ", company: "Azrak", description: "Planned, launched, and optimized paid media campaigns on Meta & Tiktok, significantly improving ROI and reducing CPA." },
    { icon: <ShoppingCart />, title: "E-commerce & Dropshipping Expert", company: "Freelance", description: "Created high-converting Shopify stores, specializing in pricing, competitor analysis, and product development." },
    { icon: <UserCheck />, title: "One-to-One Digital Marketing Coach", company: "Freelance", date: "2025–Present", description: "Delivered personalized training sessions, simplifying complex concepts to help clients execute real-world campaigns." },
    { icon: <Briefcase />, title: "Account Manager", company: "Business Empire", description: "Managed key accounts across diverse niches including fashion, cosmetics & real estate." },
    { icon: <Building />, title: "Real Estate Campaigns", company: "OFQ, Royal City", description: "Led successful digital marketing campaigns for major real estate developers." },
    { icon: <LineChart />, title: "Stock Market & Financial Analyst", company: "Self-Directed", description: "Specialized in economic, political, and technical analysis of financial markets." },
];

const skillsData = [
    "Analytical & Creative Thinker", "Content Strategy", "Google Ads", "Meta Ads", "TikTok Ads", "Snapchat Ads", "Email Marketing", "Lead Generation", "Shopify Development", "KPI Tracking", "A/B Testing", "Communication", "Presentation Skills", "Media Strategy", "Budget Management"
];

const projectsData = [
    { title: "Fashion & Apparel", image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fEZhc2hpb24lMjAlMjYlMjBBcHBhcmVsfGVufDB8fDB8fHww" },
    { title: "Cosmetics & Beauty", image: "https://www.dhl.com/discover/content/dam/hong-kong/desktop/e-commerce-advice/e-commerce-guides-by-country/guide-to-packaging-and-shipping-cosmetics-and-beauty-products-from-hong-kong/cosmetic-and-beauty-products-in-a-shipping-box-1920x998.jpg" },
    { title: "Real Estate", image: "https://www.agentadvice.com/wp-content/uploads/2020/12/shutterstock_1247473441-scaled.jpg" },
    { title: "Medical & Healthcare", image: "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8TWVkaWNhbHxlbnwwfHwwfHx8MA%3D%3D" },
    { title: "Restaurants & Cafés", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8UmVzdGF1cmFudHN8ZW58MHx8MHx8fDA%3D" },
    { title: "Furniture & Interiors", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8UmVhbCUyMEVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D" },
    { title: "SaaS", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8U2FhU3xlbnwwfHwwfHx8MA%3D%3D" },
    { title: "Tech", image: "https://www.eurokidsindia.com/blog/wp-content/uploads/2023/12/names-of-electronic-devices-in-english.jpg" },
];


// --- REUSABLE COMPONENTS ---

// Animated Counter for Achievements
const AnimatedCounter = ({ value }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const motionValue = useSpring(0, { stiffness: 50, damping: 30 });

    const formattedValue = useTransform(
        motionValue,
        // Removed the space between the currency symbol and the number as requested
        (latest) => `£${Math.round(latest).toLocaleString()}+`
    );

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    return <motion.span ref={ref}>{formattedValue}</motion.span>;
};

// Section Wrapper for consistent animation and styling
const SectionWrapper = React.forwardRef(({ id, title, children, className }, ref) => (
  <motion.section
    ref={ref}
    id={id}
    className={`py-20 md:py-28 ${className}`}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.7, ease: "easeOut" }}
  >
    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-sky-400">{title}</span>
    </h2>
    {children}
  </motion.section>
));

// Navigation Component
const Navbar = ({ activeSection }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <nav className="fixed top-0 left-0 w-full bg-neutral-950/70 backdrop-blur-lg z-50 border-b border-neutral-800/50">
            <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
                <a href="#home" className="text-2xl font-bold tracking-tight text-white hover:text-teal-400 transition-colors">{personalInfo.name}</a>
                <div className="hidden md:flex gap-8 items-center">
                    {sections.map((sec) => (
                        <a key={sec.id} href={`#${sec.id}`} className={`font-medium transition-colors ${activeSection === sec.id ? 'text-teal-400' : 'text-neutral-300 hover:text-teal-400'}`}>{sec.title}</a>
                    ))}
                </div>
                <div className="md:hidden">
                    <Button onClick={() => setIsMenuOpen(!isMenuOpen)} className="bg-transparent text-white p-2">{isMenuOpen ? <X /> : <Menu />}</Button>
                </div>
            </div>
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-neutral-900">
                        <div className="flex flex-col items-center gap-4 py-4">
                            {sections.map((sec) => (
                                <a key={sec.id} href={`#${sec.id}`} onClick={() => setIsMenuOpen(false)} className={`text-lg font-medium transition-colors ${activeSection === sec.id ? 'text-teal-400' : 'text-neutral-300 hover:text-teal-400'}`}>{sec.title}</a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

// Contact Form Component
const ContactForm = () => {
    const [status, setStatus] = useState('idle');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        // This is a mock API call. In a real app, you would send data to a backend here.
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStatus('success');
        e.target.reset();
        setTimeout(() => setStatus('idle'), 4000);
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
            <input type="text" name="name" placeholder="Your Name" required className="w-full p-3 bg-neutral-800/50 border border-neutral-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition" />
            <input type="email" name="email" placeholder="Your Email" required className="w-full p-3 bg-neutral-800/50 border border-neutral-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition" />
            <textarea name="message" placeholder="Your Message" required rows={5} className="w-full p-3 bg-neutral-800/50 border border-neutral-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition" />
            <div className="text-center">
                <Button type="submit" disabled={status === 'sending'} className="bg-teal-500 hover:bg-teal-600 text-white w-full md:w-auto disabled:bg-neutral-600 flex items-center justify-center gap-2">
                    {status === 'sending' ? 'Sending...' : 'Send Message'} <Send size={18} />
                </Button>
            </div>
            <AnimatePresence>
                {status === 'success' && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center text-green-400">Message sent successfully! Thank you.</motion.p>}
            </AnimatePresence>
        </form>
    );
};


// --- MAIN APP COMPONENT ---
export default function Portfolio() {
    const [activeSection, setActiveSection] = useState('home');
    const sectionRefs = {
        home: useRef(null),
        about: useRef(null),
        experience: useRef(null),
        skills: useRef(null),
        projects: useRef(null),
        contact: useRef(null),
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(entry => entry.isIntersecting && setActiveSection(entry.target.id)),
            { rootMargin: '-30% 0px -70% 0px' }
        );
        Object.values(sectionRefs).forEach(ref => ref.current && observer.observe(ref.current));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="bg-neutral-950 text-white min-h-screen font-sans antialiased">
            <Navbar activeSection={activeSection} />

            <main className="max-w-5xl mx-auto px-4">
                {/* Hero Section */}
                <section ref={sectionRefs.home} id="home" className="min-h-screen flex flex-col justify-center items-center text-center relative">
                    <div className="absolute inset-0 -z-10 h-full w-full bg-neutral-950 bg-[radial-gradient(#2d2d2d_1px,transparent_1px)] [background-size:32px_32px]"></div>
                    {/* Added the profile image as requested by the user */}
                    <motion.img
                        src={personalInfo.profileImage}
                        alt="Profile Picture of Abdullah Rashid"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="w-32 h-32 rounded-full object-cover border-4 border-neutral-700 mb-6"
                        onError={(e) => {
                          e.target.src = "https://placehold.co/128x128/334155/E2E8F0?text=AR";
                          e.target.alt = "Placeholder image with initials AR";
                        }}
                    />
                    <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4">Abdullah Rashid<br/>Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">Digital Growth</span> Partner.</motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-lg md:text-xl text-neutral-300 mb-8">{personalInfo.title}</motion.p>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
                        {/* Updated the href to the new Google Forms link */}
                        <a href="https://docs.google.com/forms/d/10VnJVDvM4agvJ2y_M5MfC4-87tTYQNe30F4faxpGkVA/edit?ts=687cefe4" target="_blank" rel="noopener noreferrer"><Button className="bg-teal-500 hover:bg-teal-600 text-white shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30">Let’s Work Together</Button></a>
                    </motion.div>
                </section>

                {/* About Me */}
                <SectionWrapper ref={sectionRefs.about} id="about" title="About Me">
                    <p className="text-lg text-center leading-relaxed text-neutral-300 max-w-3xl mx-auto">
                        With over 4 years in digital marketing, performance media buying, and e-commerce growth, I specialize in transforming brands. I develop high-converting Shopify stores, scale ad campaigns to new heights, and coach businesses to success. My diverse background in trading, economic analysis, and content production gives me a unique, data-driven yet creative approach to every challenge.
                    </p>
                </SectionWrapper>

                {/* Experience Timeline */}
                <SectionWrapper ref={sectionRefs.experience} id="experience" title="Experience Timeline">
                    <div className="max-w-3xl mx-auto relative">
                        <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-neutral-800 -translate-x-1/2"></div>
                        {experienceData.map((item, index) => (
                            <motion.div key={index} className={`mb-12 flex items-start gap-4 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`} initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6 }}>
                                <div className="hidden md:block w-1/2"></div>
                                <div className="relative w-full md:w-1/2">
                                    <div className="absolute -left-1.5 md:left-auto md:right-full md:mr-6 lg:mr-7 top-1 w-8 h-8 rounded-full bg-neutral-800 border-2 border-teal-500 flex items-center justify-center text-teal-400">{item.icon}</div>
                                    <Card className="hover:border-teal-500/50 transition-colors">
                                        <CardContent>
                                            <p className="text-xs text-amber-400 mb-1">{item.date}</p>
                                            <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
                                            <p className="text-sm text-neutral-400 font-medium mb-3">{item.company}</p>
                                            <p className="text-neutral-400">{item.description}</p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </SectionWrapper>
                
                {/* Achievements Visualization */}
                <SectionWrapper id="achievements" title="Key Achievements">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto text-center">
                        <Card>
                            <CardContent>
                                <h3 className="text-2xl font-bold text-amber-400 mb-2">Total Ad Spend Managed</h3>
                                {/* Adjusted the styling to ensure the number and symbol are centered */}
                                {/* تم تحديث القيمة إلى 750000 بناءً على طلبك */}
                                <p className="text-5xl font-mono font-bold text-white flex justify-center"><AnimatedCounter value={750000} /></p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <h3 className="text-2xl font-bold text-teal-400 mb-2">Average ROI Generated</h3>
                                <p className="text-5xl font-mono font-bold text-white">13x - 20x</p>
                                <div className="flex justify-center items-end gap-2 mt-4 h-16">
                                    <motion.div initial={{height: 0}} whileInView={{height: '25%'}} viewport={{once: true}} transition={{delay: 0.2}} className="w-12 bg-neutral-700 rounded-t-sm flex items-end justify-center"><span className="text-xs -mb-5">Spend</span></motion.div>
                                    <motion.div initial={{height: 0}} whileInView={{height: '100%'}} viewport={{once: true}} transition={{delay: 0.4}} className="w-12 bg-gradient-to-t from-teal-500 to-sky-400 rounded-t-sm flex items-end justify-center"><span className="text-xs -mb-5">Return</span></motion.div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </SectionWrapper>

                {/* Skills & Expertise */}
                <SectionWrapper ref={sectionRefs.skills} id="skills" title="Skills & Expertise">
                    <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                        {skillsData.map((skill, index) => (
                            <motion.div key={index} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: index * 0.05 }} className="bg-neutral-800 text-neutral-300 px-4 py-2 rounded-full text-sm font-medium">{skill}</motion.div>
                        ))}
                    </div>
                </SectionWrapper>
                
                {/* Industries */}
                <SectionWrapper ref={sectionRefs.projects} id="projects" title="Industries">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {projectsData.map((project, index) => (
                            <motion.a href={project.url} target="_blank" rel="noopener noreferrer" key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                                <Card className="group overflow-hidden h-full">
                                    <img src={project.image} alt={project.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                                    <CardContent>
                                        <h3 className="text-xl font-semibold text-white flex items-center justify-between">
                                            {project.title}
                                            <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-teal-400" />
                                        </h3>
                                    </CardContent>
                                </Card>
                            </motion.a>
                        ))}
                    </div>
                </SectionWrapper>
                
                {/* Content & Education */}
                <div className="grid md:grid-cols-2 gap-8">
                    <SectionWrapper id="content-production" title="Content Production">
                        <div className="text-center max-w-md mx-auto">
                            <Camera className="mx-auto text-amber-400 mb-4" size={40}/>
                            <p className="text-neutral-300 leading-relaxed">Supervised full-cycle photo/video shoots, managed influencer collaborations, and developed compelling ad creatives and storytelling strategies to build brand narratives that resonate.</p>
                        </div>
                    </SectionWrapper>
                    <SectionWrapper id="education" title="Education">
                           <div className="text-center max-w-md mx-auto">
                            <GraduationCap className="mx-auto text-amber-400 mb-4" size={40}/>
                            <h4 className="font-semibold text-lg text-white">Ain Shams University</h4>
                            <p className="text-neutral-300 leading-relaxed">Bachelor of Business Administration, gaining foundations in marketing, finance, and economics. Explored emerging markets like crypto, NFTs, and digital goods.</p>
                        </div>
                    </SectionWrapper>
                </div>


                {/* Contact */}
                <SectionWrapper ref={sectionRefs.contact} id="contact" title="Let's Get In Touch">
                    <ContactForm />
                </SectionWrapper>
            </main>

            <footer className="text-center py-8 mt-16 border-t border-neutral-800/50">
                <div className="flex justify-center gap-6 mb-4">
                    <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-teal-400 transition-colors"><Linkedin /></a>
                    {/* Added the WhatsApp icon as requested */}
                    <a href={personalInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-green-500 transition-colors"><Phone /></a>
                </div>
                <p className="text-neutral-500 text-sm">
                    © {new Date().getFullYear()} {personalInfo.name}. All Rights Reserved.
                </p>
            </footer>
        </div>
    );
}
