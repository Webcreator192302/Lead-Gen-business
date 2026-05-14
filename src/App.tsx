/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  CheckCircle2, 
  Layout, 
  TrendingUp, 
  Zap, 
  Plus, 
  ChevronDown,
  Shield,
  MessageSquare,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { saveLead, testConnection } from './lib/firestoreService';

// --- Sub-components ---

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: 'Services', href: '#services' },
    { title: 'How It Works', href: '#how-it-works' },
    { title: 'Results', href: '#results' },
    { title: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-dark-surface/80 backdrop-blur-md border-b border-white/10 py-4 shadow-lg' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="text-2xl font-display font-bold tracking-tighter text-white">
          Convert<span className="text-brand">Max</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.title} href={link.href} className="text-sm font-medium text-white/70 hover:text-brand transition-colors">
              {link.title}
            </a>
          ))}
          <button className="bg-brand hover:bg-brand/90 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-brand/20 transition-all hover:scale-105 active:scale-95 animate-pulse">
            Book a Free Call
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-dark-bg z-40 flex flex-col items-center justify-center gap-8 overflow-hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.title} 
                href={link.href} 
                className="text-3xl font-display font-bold text-white hover:text-brand transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.title}
              </a>
            ))}
            <button className="bg-brand text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl shadow-brand/20 mt-4">
              Book a Free Call
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden min-h-screen flex items-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/10 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-white/50 mb-8"
        >
          Trusted by 200+ fast-growing businesses
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-8xl font-display font-bold leading-[0.9] tracking-tighter mb-8"
        >
          We Help <span className="text-brand text-glow">Businesses</span> Get <br className="hidden md:block" />
          <span className="italic">More Demo Calls</span> Without Paid Ads
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 mb-12"
        >
          Stop wasting thousands on cold outreach that goes to spam. We build high-converting automated lead systems that book calls while you sleep.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
        >
          <a href="#booking" className="bg-brand text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl shadow-brand/40 transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
            Book Your Free 20-Min Call <ArrowRight size={20} />
          </a>
          <a href="#how-it-works" className="text-white/70 hover:text-white font-medium flex items-center gap-2 group transition-all">
            See How It Works <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform" />
          </a>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="pt-12 border-t border-white/5"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 mb-8">Trusted by teams at:</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale contrast-125">
            {['Acme', 'Stellar', 'Lumina', 'Orbit', 'Vortex'].map(i => (
              <span key={i} className="text-2xl font-display font-black tracking-tighter">{i}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Problems = () => {
  const pains = [
    {
      icon: <TrendingUp className="text-brand" />,
      title: "Inconsistent Flow",
      desc: "Feast or famine every month. You never know where your next 10 calls are coming from."
    },
    {
      icon: <Layout className="text-brand" />,
      title: "Opaque Systems",
      desc: "No clear data on which channels are actually working. You're guessing with your budget."
    },
    {
      icon: <Zap className="text-brand" />,
      title: "Low Quality Leads",
      desc: "Wasting sales team time on prospects that can't afford you or don't need your solution."
    }
  ];

  return (
    <section className="py-24 bg-dark-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">You're probably dealing with...</h2>
          <p className="text-white/50">The common bottlenecks holding your scaling back.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {pains.map((pain, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-brand/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center mb-6 overflow-hidden">
                {pain.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{pain.title}</h3>
              <p className="text-white/60 leading-relaxed">{pain.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Steps = () => {
  const steps = [
    {
      title: "Discovery Call",
      desc: "We spend 20 minutes learning your business, goals, and current bottlenecks to see if we can actually help."
    },
    {
      title: "Custom Strategy",
      desc: "You receive a tailored plan built around your specific market, ideal customer, and specific revenue targets."
    },
    {
      title: "Execution & Results",
      desc: "We implement, track, and optimize every single touchpoint until results are measurable and predictable."
    }
  ];

  return (
    <section id="how-it-works" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">From first click to booked call</h2>
          <p className="text-white/50">Our 3-step process to transform your lead generation.</p>
        </div>
        
        <div className="relative">
          <div className="hidden md:block absolute top-[60px] left-0 w-full h-[1px] bg-white/10 -z-10" />
          <div className="grid md:grid-cols-3 gap-16">
            {steps.map((step, idx) => (
              <div key={idx} className="relative text-center">
                <div className="w-12 h-12 bg-dark-bg border-4 border-brand rounded-full flex items-center justify-center font-black mx-auto mb-8 z-10">
                  {idx + 1}
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-white/50 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Results = () => {
  return (
    <section id="results" className="py-24 bg-white text-dark-bg rounded-t-[64px]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 text-center mb-24">
          <div>
            <div className="text-6xl font-display font-black text-brand mb-2">200+</div>
            <div className="text-sm font-bold uppercase tracking-widest text-dark-bg/40">Clients Served</div>
          </div>
          <div>
            <div className="text-6xl font-display font-black text-brand mb-2">4.8★</div>
            <div className="text-sm font-bold uppercase tracking-widest text-dark-bg/40">Average Rating</div>
          </div>
          <div>
            <div className="text-6xl font-display font-black text-brand mb-2">$0</div>
            <div className="text-sm font-bold uppercase tracking-widest text-dark-bg/40">Wasted on Guesswork</div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2].map(i => (
            <div key={i} className="p-10 rounded-[40px] bg-dark-bg/5 border border-dark-bg/10">
              <div className="flex gap-1 text-brand mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-xl font-medium mb-8 leading-relaxed italic">
                "{i === 1 ? "The strategy ConvertMax implemented was a total game-changer. We saw a 3x increase in qualified demos in just the first 45 days. No fluff, just results." : "Finally a partner that understands B2B nuances. Our pipeline has never been this consistent. It's like having a 24/7 sales machine."}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-dark-bg/10 flex items-center justify-center font-bold">
                  {i === 1 ? 'JD' : 'AS'}
                </div>
                <div>
                  <div className="font-bold">{i === 1 ? 'John Davies' : 'Alice Smith'}</div>
                  <div className="text-sm text-dark-bg/50">{i === 1 ? 'CEO @ StellarTech' : 'VP Sales @ Vortex'}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  
  const faqs = [
    { q: "How long is the call?", a: "The call is exactly 20 minutes. It's a high-value discovery session, not a high-pressure sales pitch." },
    { q: "Is this only for large companies?", a: "No, we work with businesses of all sizes and established B2B firms. If you have a solid product and need more calls, we help." },
    { q: "What happens after the call?", a: "You'll receive a full follow-up summary and a custom strategy plan within 24 business hours." },
    { q: "Do I need to prepare anything?", a: "Just an open mind. We guide the conversation and ask focused questions about your current model." },
    { q: "What if I'm not ready to commit?", a: "That's perfectly fine. Many of our clients start with the discovery call just to identify their own bottlenecks." }
  ];

  return (
    <section id="faq" className="py-24 bg-dark-surface">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-16">Objection Killers</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-white/10">
              <button 
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full py-6 flex items-center justify-between text-left hover:text-brand transition-colors"
              >
                <span className="text-lg font-bold">{faq.q}</span>
                <div className={`transition-transform duration-300 ${openIdx === idx ? 'rotate-45 text-brand' : ''}`}>
                  <Plus size={24} />
                </div>
              </button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-white/50 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    challenge: '',
    referralSource: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus('loading');
  
  try {
    // Save to Firestore (this works)
    await saveLead(formData);
    
    setStatus('success');
    
  } catch (err) {
    console.error(err);
    setStatus('error');
  }
};

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl mx-auto text-center p-12 bg-white/5 border border-brand/30 rounded-[40px]"
      >
        <div className="w-20 h-20 bg-brand/20 rounded-full flex items-center justify-center mx-auto mb-8 text-brand">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="text-3xl font-display font-bold mb-4">You're Booked!</h3>
        <p className="text-white/60 text-lg mb-8">Check your email for next steps. We'll be in touch within 24 hours to confirm your exact time slot.</p>
        <button onClick={() => setStatus('idle')} className="text-brand font-bold">Submit another booking?</button>
      </motion.div>
    );
  }

  return (
    <section id="booking" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-brand/5 -z-10" />
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 italic">Let's Talk. No Pitch.</h2>
          <p className="text-xl text-white/50">Pick a time that works for you. We'll do the rest.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-dark-surface p-8 md:p-12 rounded-[48px] border border-white/10 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/50">Full Name *</label>
              <input 
                required
                type="text" 
                placeholder="John Doe"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/50">Business Email *</label>
              <input 
                required
                type="email" 
                placeholder="john@company.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/50">Company Name *</label>
              <input 
                required
                type="text" 
                placeholder="StellarTech Inc."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                value={formData.company}
                onChange={e => setFormData({...formData, company: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/50">Phone Number (Optional)</label>
              <input 
                type="tel" 
                placeholder="+1 (555) 000-0000"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/50">Biggest Challenge? *</label>
              <select 
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand outline-none appearance-none"
                value={formData.challenge}
                onChange={e => setFormData({...formData, challenge: e.target.value})}
              >
                <option value="" disabled className="bg-dark-bg">Select a challenge</option>
                <option value="Lead Generation" className="bg-dark-bg">Lead Generation</option>
                <option value="Sales Conversion" className="bg-dark-bg">Sales Conversion</option>
                <option value="Brand Awareness" className="bg-dark-bg">Brand Awareness</option>
                <option value="Scaling Operations" className="bg-dark-bg">Scaling Operations</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/50">How did you hear about us? *</label>
              <select 
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand outline-none appearance-none"
                value={formData.referralSource}
                onChange={e => setFormData({...formData, referralSource: e.target.value})}
              >
                <option value="" disabled className="bg-dark-bg">Select source</option>
                <option value="Google" className="bg-dark-bg">Google</option>
                <option value="LinkedIn" className="bg-dark-bg">LinkedIn</option>
                <option value="Referral" className="bg-dark-bg">Referral</option>
                <option value="Social Media" className="bg-dark-bg">Social Media</option>
              </select>
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="w-full bg-brand text-white py-5 rounded-2xl font-black text-xl shadow-2xl shadow-brand/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {status === 'loading' ? 'Securing your spot...' : (
              <>Claim My Free Strategy Call <ArrowRight /></>
            )}
          </button>
          
          {status === 'error' && (
            <p className="text-red-400 mt-4 text-center font-bold font-mono">Submission failed. Please try again or email us directly.</p>
          )}
          
          <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-white/30 text-[10px] font-bold uppercase tracking-widest">
            <span className="flex items-center gap-2"><Shield size={14} /> Your info is private</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={14} /> No spam, ever</span>
            <span className="flex items-center gap-2"><Zap size={14} /> Reply within 24hrs</span>
          </div>
        </form>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 bg-dark-surface border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="text-2xl font-display font-bold mb-6 italic">ConvertMax</div>
            <p className="text-white/40 max-w-sm mb-8 font-medium">The performance partner for businesses who are tired of guessing. We turn clicks into predictable revenue.</p>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-brand mb-6">Company</div>
            <ul className="space-y-4 text-white/50 text-sm font-medium">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-brand mb-6">Connect</div>
            <ul className="space-y-4 text-white/50 text-sm font-medium">
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Twitter / X</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-[10px] font-bold uppercase tracking-[0.2em]">
          <div>© {new Date().getFullYear()} ConvertMax. All rights reserved.</div>
          <div className="italic text-brand/50">Built to convert.</div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  useEffect(() => {
    testConnection();
  }, []);

  return (
    <div className="selection:bg-brand selection:text-white">
      <Nav />
      <Hero />
      <Problems />
      <Steps />
      <Results />
      <FAQ />
      <BookingForm />
      <Footer />
    </div>
  );
}
