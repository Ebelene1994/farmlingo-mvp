

import React, { useState } from 'react';
import { Target, Heart, Globe, Mail, MapPin, Phone, Linkedin, Twitter, Facebook, Send, CheckCircle, AlertCircle, Shield, Lightbulb, Users } from 'lucide-react';
import { TEAM_MEMBERS } from '../constants';

const About: React.FC = () => {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      // Basic validation simulation
      if (formData.name && formData.email && formData.message) {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setFormStatus('error');
      }
    }, 1500);
  };

  const CORE_VALUES = [
    {
      icon: Heart,
      title: "Sustainability First",
      desc: "We prioritize agricultural practices that protect the environment, focusing on long-term soil health and biodiversity.",
      color: "text-rose-600",
      bg: "bg-rose-100"
    },
    {
      icon: Lightbulb,
      title: "Innovation Driven",
      desc: "Leveraging cutting-edge technology like VR and AI to solve age-old farming challenges and modernize education.",
      color: "text-amber-600",
      bg: "bg-amber-100"
    },
    {
      icon: Users,
      title: "Community Centric",
      desc: "Building a global network where farmers, students, and experts share knowledge freely to lift everyone up.",
      color: "text-blue-600",
      bg: "bg-blue-100"
    },
    {
      icon: Shield,
      title: "Integrity & Trust",
      desc: "Providing verified, scientific data that farmers can rely on for their livelihoods and business decisions.",
      color: "text-emerald-600",
      bg: "bg-emerald-100"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero / Mission Section */}
      <section className="relative bg-slate-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Farm Landscape" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-bold uppercase tracking-wider mb-6 animate-in fade-in slide-in-from-bottom-4">
            Our Mission
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 leading-tight animate-in fade-in slide-in-from-bottom-4 delay-100">
            Empowering the <span className="text-emerald-400">Next Generation</span> of Farmers
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 delay-200">
            Farmlingo was founded on a simple belief: that sustainable agriculture is the key to our planet's future. By democratizing access to expert knowledge and connecting a global community, we are bridging the gap between traditional wisdom and modern technology.
          </p>
        </div>
      </section>

      {/* 2. Core Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              These principles guide every decision we make, from the code we write to the partnerships we build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {CORE_VALUES.map((val, idx) => (
              <div key={idx} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className={`w-14 h-14 ${val.bg} rounded-xl flex items-center justify-center ${val.color} mb-6 group-hover:scale-110 transition-transform`}>
                  <val.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{val.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Team Members Section */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Meet the Team</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              A diverse group of agricultural scientists, educators, and engineers passionate about food security.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM_MEMBERS.map(member => (
              <div key={member.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="aspect-square overflow-hidden bg-slate-100 relative">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                     <div className="flex gap-3 justify-center">
                        <a href="#" className="p-2 bg-white/20 hover:bg-white text-white hover:text-slate-900 rounded-full backdrop-blur-sm transition-colors"><Linkedin className="w-4 h-4" /></a>
                        <a href="#" className="p-2 bg-white/20 hover:bg-white text-white hover:text-slate-900 rounded-full backdrop-blur-sm transition-colors"><Twitter className="w-4 h-4" /></a>
                     </div>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-bold text-slate-900 text-lg mb-1">{member.name}</h3>
                  <p className="text-emerald-600 font-bold text-xs uppercase tracking-wider mb-4">{member.role}</p>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Contact Information & Inquiry Form */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <span className="text-emerald-600 font-bold tracking-wider uppercase text-sm mb-2 block">Get in Touch</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">We'd love to hear from you</h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Whether you have a question about our courses, need enterprise solutions, or just want to say hello, our team is ready to answer all your questions.
                </p>
              </div>

              <div className="space-y-6 pt-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">Headquarters</h4>
                    <p className="text-slate-500">123 Innovation Drive<br />San Francisco, CA 94103</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">Email Us</h4>
                    <a href="mailto:hello@farmlingo.com" className="text-slate-500 hover:text-emerald-600 transition-colors">hello@farmlingo.com</a>
                    <br />
                    <a href="mailto:support@farmlingo.com" className="text-slate-500 hover:text-emerald-600 transition-colors">support@farmlingo.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">Call Us</h4>
                    <p className="text-slate-500">+1 (555) 123-4567</p>
                    <p className="text-xs text-slate-400 mt-1">Mon-Fri from 8am to 5pm PST</p>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <h4 className="font-bold text-slate-900 mb-4">Follow Us</h4>
                <div className="flex gap-4">
                   <a href="#" className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-emerald-600 hover:text-white transition-all">
                      <Facebook className="w-5 h-5" />
                   </a>
                   <a href="#" className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-emerald-600 hover:text-white transition-all">
                      <Twitter className="w-5 h-5" />
                   </a>
                   <a href="#" className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-emerald-600 hover:text-white transition-all">
                      <Linkedin className="w-5 h-5" />
                   </a>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="bg-slate-50 p-8 md:p-10 rounded-3xl border border-slate-200 shadow-lg relative overflow-hidden">
               {/* Decorative Element */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16"></div>

               <h3 className="text-2xl font-bold text-slate-900 mb-6">Send us a message</h3>
               
               {formStatus === 'success' ? (
                 <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center animate-in fade-in zoom-in">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                       <CheckCircle className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-800 mb-2">Message Sent!</h4>
                    <p className="text-slate-600 mb-6">Thank you for contacting us. We will get back to you within 24 hours.</p>
                    <button 
                      onClick={() => setFormStatus('idle')}
                      className="px-6 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 font-bold hover:bg-slate-50 transition-colors"
                    >
                      Send Another
                    </button>
                 </div>
               ) : (
                 <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                       <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Name <span className="text-red-500">*</span></label>
                          <input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-sm" 
                            placeholder="John Doe" 
                            required
                          />
                       </div>
                       <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Email <span className="text-red-500">*</span></label>
                          <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-sm" 
                            placeholder="john@example.com" 
                            required
                          />
                       </div>
                    </div>
                    
                    <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Subject</label>
                       <select 
                          name="subject"
                          value={formData.subject}
                          onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm cursor-pointer"
                       >
                          <option value="">Select a topic</option>
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Course Support">Course Support</option>
                          <option value="Partnership">Partnership</option>
                          <option value="Technical Issue">Technical Issue</option>
                       </select>
                    </div>

                    <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Message <span className="text-red-500">*</span></label>
                       <textarea 
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4} 
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none shadow-sm" 
                          placeholder="How can we help you today?"
                          required
                       ></textarea>
                    </div>

                    {formStatus === 'error' && (
                      <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm font-medium">
                         <AlertCircle className="w-4 h-4" /> Please fill in all required fields.
                      </div>
                    )}

                    <button 
                      type="submit" 
                      disabled={formStatus === 'submitting'}
                      className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed group"
                    >
                      {formStatus === 'submitting' ? (
                        <span className="flex items-center gap-2">
                           <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                           Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                           Send Message <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      )}
                    </button>
                    <p className="text-xs text-slate-500 text-center mt-4">
                      By submitting this form, you agree to our <a href="#" className="underline hover:text-emerald-600">Privacy Policy</a>.
                    </p>
                 </form>
               )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;