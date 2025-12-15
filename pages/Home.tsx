
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Trophy, Star, Quote, Smartphone, Award } from 'lucide-react';
import { SignInButton } from '@clerk/clerk-react';
import { COURSES, TESTIMONIALS } from '../constants';

const Home: React.FC = () => {
  // Show 9 featured courses instead of just 3
  const featuredCourses = COURSES.slice(0, 9);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Farm Landscape"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/50 to-slate-900"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center lg:text-left">
          <div className="lg:w-2/3">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight animate-in fade-in slide-in-from-bottom-8 duration-700">
              Cultivating Knowledge for a <span className="text-emerald-400">Sustainable Future</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
              Join the world's leading platform for agricultural education. Learn from experts, connect with farmers, and grow your potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              <SignInButton mode="modal">
                <button className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-1 flex items-center justify-center">
                  Start Learning Free <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </SignInButton>
              <SignInButton mode="modal">
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all flex items-center justify-center">
                  Explore Courses
                </button>
              </SignInButton>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-emerald-50 py-12 border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-4xl font-black text-emerald-600">50k+</div>
            <div className="text-sm font-bold text-slate-600 uppercase tracking-wide">Active Learners</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-black text-emerald-600">120+</div>
            <div className="text-sm font-bold text-slate-600 uppercase tracking-wide">Expert Courses</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-black text-emerald-600">15+</div>
            <div className="text-sm font-bold text-slate-600 uppercase tracking-wide">Countries</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-black text-emerald-600">98%</div>
            <div className="text-sm font-bold text-slate-600 uppercase tracking-wide">Satisfaction</div>
          </div>
        </div>
      </section>

      {/* Featured Courses - Expanded to 9 items */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Featured Courses</h2>
              <p className="text-slate-500 text-lg">Hand-picked by our curriculum experts.</p>
            </div>
            <SignInButton mode="modal">
              <button className="hidden sm:flex items-center font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
                View All <ArrowRight className="w-5 h-5 ml-1" />
              </button>
            </SignInButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map(course => (
              <SignInButton mode="modal" key={course.id}>
                <button className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full w-full text-left">
                  <div className="relative aspect-video overflow-hidden bg-slate-100">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-slate-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
                      {course.category}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-tight">
                      {course.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex text-amber-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="ml-1 font-bold text-slate-700">{course.rating}</span>
                      </div>
                      <span className="text-slate-400 text-sm">• {course.totalLessons} Lessons</span>
                    </div>
                    <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <img src={`https://picsum.photos/seed/${course.instructor}/30/30`} className="w-6 h-6 rounded-full" alt="" />
                        <span className="truncate max-w-[120px]">{course.instructor}</span>
                      </div>
                      <span className="font-bold text-emerald-600 text-lg">${course.price || 'Free'}</span>
                    </div>
                  </div>
                </button>
              </SignInButton>
            ))}
          </div>

          <div className="mt-12 text-center sm:hidden">
            <SignInButton mode="modal">
              <button className="inline-flex items-center px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">
                View All Courses <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </SignInButton>
          </div>
        </div>
      </section>

      {/* Why Learn With Us? Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Why Choose Farmlingo?</h2>
            <p className="text-slate-500 text-lg">We combine practical farming wisdom with cutting-edge technology to give you the best learning experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-emerald-200 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-5">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Accredited Certifications</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Earn recognized certificates to boost your career and demonstrate your expertise to employers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-5">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Expert Mentorship</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Get direct access to agricultural scientists and experienced farmers for guidance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-purple-200 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-5">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Offline Learning</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Download lessons and access content from anywhere, even in remote fields without internet.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-amber-200 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 mb-5">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Gamified Progress</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Stay motivated with badges, leaderboards, and daily streaks as you master new skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Banner CTA */}
      <section className="bg-emerald-900 py-16">
        <div className="max-w-7xl mx-auto px-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
            <div className="md:w-3/5 text-center md:text-left">
              <span className="text-emerald-300 font-bold uppercase tracking-wider text-sm mb-2 block">Join the movement</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Connect with 50,000+ Farmers Worldwide</h2>
              <p className="text-emerald-100 text-lg leading-relaxed mb-8">
                Share experiences, troubleshoot crop issues, and find business partners in our thriving global community forum.
              </p>
              <SignInButton mode="modal">
                <button className="inline-flex items-center px-8 py-4 bg-white text-emerald-900 font-bold rounded-xl hover:bg-emerald-50 transition-colors">
                  Join Community Free <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </SignInButton>
            </div>
            <div className="md:w-2/5 flex justify-center">
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Farmer" className="rounded-2xl shadow-lg transform translate-y-4" />
                <img src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Farming" className="rounded-2xl shadow-lg transform -translate-y-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-800 mb-12 text-center">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map(t => (
              <div key={t.id} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative hover:shadow-md transition-shadow">
                <Quote className="w-10 h-10 text-emerald-100 absolute top-6 right-6" />
                <p className="text-slate-700 italic mb-6 relative z-10 leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-4 border-t border-slate-50 pt-6">
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-50" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                    <p className="text-xs text-emerald-600 font-bold uppercase">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
          </svg>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Ready to start your journey?</h2>
          <p className="text-slate-300 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">Join Farmlingo today and get unlimited access to our starter courses, community forums, and daily market insights.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignInButton mode="modal">
              <button className="px-10 py-4 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-400 transition-colors shadow-lg hover:shadow-emerald-500/25">
                Create Free Account
              </button>
            </SignInButton>
            <SignInButton mode="modal">
              <button className="px-10 py-4 bg-transparent border border-slate-600 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">
                Learn More About Us
              </button>
            </SignInButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
