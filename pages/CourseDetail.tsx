
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { COURSES, MOCK_LESSONS, REVIEWS } from '../constants';
import { UserRole } from '../types';
import { Star, Clock, BookOpen, Globe, CheckCircle, Play, Lock, AlertCircle, Share2, Heart, ChevronDown, ChevronUp } from 'lucide-react';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'reviews' | 'instructor'>('overview');
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({ 'm1': true });

  const course = COURSES.find(c => c.id === id);
  const lessons = MOCK_LESSONS.filter(l => l.courseId === id || l.courseId === 'c1'); // Fallback to c1 lessons for demo
  const reviews = REVIEWS; // Using all mock reviews for demo

  if (!course) {
    return <div className="p-8 text-center text-slate-500">Course not found</div>;
  }

  const toggleModule = (modId: string) => {
    setExpandedModules(prev => ({ ...prev, [modId]: !prev[modId] }));
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-900/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
        
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-emerald-300">
                <span className="bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
                  {course.category}
                </span>
                <span className="flex items-center">
                   <Clock className="w-4 h-4 mr-1.5" /> Last updated {course.lastUpdated || 'Oct 2023'}
                </span>
                <span className="flex items-center">
                   <Globe className="w-4 h-4 mr-1.5" /> {course.language}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">{course.title}</h1>
              <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">{course.description}</p>
              
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                   <div className="flex text-amber-400">
                     {[1,2,3,4,5].map(star => (
                       <Star key={star} className={`w-5 h-5 ${star <= Math.round(course.rating) ? 'fill-current' : 'text-slate-600'}`} />
                     ))}
                   </div>
                   <span className="font-bold text-lg">{course.rating}</span>
                   <span className="text-slate-400">({reviews.length} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="font-bold text-white">{1250}</span> students enrolled
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <img src="https://picsum.photos/seed/instructor/50/50" className="w-10 h-10 rounded-full border-2 border-slate-700" alt={course.instructor} />
                <div>
                   <p className="text-sm text-slate-400">Created by</p>
                   <p className="font-semibold text-white">{course.instructor}</p>
                </div>
              </div>
            </div>

            {/* Floating Card for Desktop (Hidden on mobile, rebuilt below) */}
            <div className="hidden lg:block w-96 shrink-0 relative">
               <div className="bg-white rounded-2xl shadow-2xl p-6 text-slate-800 absolute top-0 right-0 border border-slate-200">
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-6 group cursor-pointer">
                    <img src={course.thumbnail} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="Preview" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                       <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                          <Play className="w-6 h-6 text-emerald-600 ml-1" fill="currentColor" />
                       </div>
                    </div>
                    <div className="absolute bottom-4 left-0 right-0 text-center text-white font-semibold text-sm">Preview Course</div>
                  </div>

                  <div className="flex items-end gap-3 mb-6">
                     <span className="text-3xl font-bold text-slate-900">${course.price || 49.99}</span>
                     <span className="text-lg text-slate-400 line-through mb-1">$99.99</span>
                     <span className="text-emerald-600 font-bold mb-1 text-sm bg-emerald-50 px-2 py-0.5 rounded">50% OFF</span>
                  </div>

                  <div className="space-y-3 mb-6">
                     <Link to={`/courses/${id}/learn`} className="block w-full py-3.5 bg-emerald-600 text-white text-center font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200">
                        Enroll Now
                     </Link>
                     <button className="block w-full py-3.5 bg-white border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors">
                        Add to Wishlist
                     </button>
                  </div>

                  <div className="space-y-3 text-sm text-slate-600">
                     <p className="font-bold text-slate-900 mb-2">This course includes:</p>
                     <div className="flex items-center gap-3"><Clock className="w-4 h-4 text-emerald-600" /> {course.duration} on-demand video</div>
                     <div className="flex items-center gap-3"><BookOpen className="w-4 h-4 text-emerald-600" /> {course.totalLessons} lessons</div>
                     <div className="flex items-center gap-3"><Globe className="w-4 h-4 text-emerald-600" /> Full lifetime access</div>
                     <div className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-emerald-600" /> Certificate of completion</div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1">
             {/* Mobile Enrollment Card (Visible only on mobile) */}
             <div className="lg:hidden bg-white p-6 rounded-xl shadow-lg border border-slate-100 mb-8">
                <div className="flex items-center justify-between mb-4">
                   <span className="text-3xl font-bold text-slate-900">${course.price || 49.99}</span>
                   <Link to={`/courses/${id}/learn`} className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-lg">Enroll Now</Link>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                   <span className="flex items-center"><Play className="w-4 h-4 mr-1" /> {course.totalLessons} Lessons</span>
                   <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {course.duration}</span>
                </div>
             </div>

             {/* Tabs */}
             <div className="border-b border-slate-200 mb-8 flex overflow-x-auto">
                {['overview', 'curriculum', 'reviews', 'instructor'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-6 py-4 font-bold text-sm capitalize whitespace-nowrap transition-colors border-b-2 ${
                      activeTab === tab 
                        ? 'border-emerald-600 text-emerald-700' 
                        : 'border-transparent text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
             </div>

             {/* Tab Content */}
             <div className="space-y-8">
                {activeTab === 'overview' && (
                  <div className="space-y-8 animate-in fade-in duration-500">
                     <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 className="text-xl font-bold text-slate-800 mb-4">What you'll learn</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           {course.learningOutcomes?.map((outcome, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                 <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                 <span className="text-slate-600 text-sm">{outcome}</span>
                              </div>
                           )) || <p className="text-slate-500 italic">Learning outcomes coming soon.</p>}
                        </div>
                     </div>
                     
                     <div className="prose prose-slate max-w-none">
                        <h3 className="text-xl font-bold text-slate-800">Requirements</h3>
                        <ul className="list-disc pl-5 space-y-2 text-slate-600">
                           {course.requirements?.map((req, idx) => (
                              <li key={idx}>{req}</li>
                           )) || <li>No prerequisites required.</li>}
                        </ul>
                        
                        <h3 className="text-xl font-bold text-slate-800 mt-8">Description</h3>
                        <p className="text-slate-600 leading-relaxed">
                           {course.description} This comprehensive course guides you through every step of the process, ensuring you gain both theoretical knowledge and practical skills. Whether you are a beginner looking to start your first farm or an experienced agriculturist seeking to modernize your techniques, this course offers valuable insights tailored to your needs.
                        </p>
                     </div>
                  </div>
                )}

                {activeTab === 'curriculum' && (
                  <div className="space-y-4 animate-in fade-in duration-500">
                     <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-slate-800">Course Content</h3>
                        <span className="text-sm text-slate-500 font-medium">{course.totalLessons} lessons • {course.duration} total length</span>
                     </div>
                     
                     <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                        {/* Module 1 */}
                        <div className="border-b border-slate-100 last:border-0">
                           <button 
                              onClick={() => toggleModule('m1')}
                              className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors"
                           >
                              <div className="flex items-center gap-3">
                                 {expandedModules['m1'] ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                                 <span className="font-bold text-slate-800">Module 1: Introduction</span>
                              </div>
                              <span className="text-sm text-slate-500">4 lessons</span>
                           </button>
                           
                           {expandedModules['m1'] && (
                              <div className="divide-y divide-slate-100">
                                 {lessons.map((lesson, idx) => (
                                    <div key={lesson.id} className="px-6 py-3 flex items-center justify-between hover:bg-slate-50 group">
                                       <div className="flex items-center gap-3">
                                          {lesson.type === 'video' ? <Play className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" /> : <BookOpen className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />}
                                          <span className="text-slate-700 text-sm group-hover:text-emerald-700 transition-colors">{lesson.title}</span>
                                       </div>
                                       <div className="flex items-center gap-4">
                                          {idx > 0 ? <Lock className="w-3 h-3 text-slate-300" /> : <span className="text-xs text-emerald-600 font-bold">Preview</span>}
                                          <span className="text-xs text-slate-500 w-12 text-right">{lesson.duration}</span>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           )}
                        </div>
                     </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-6 animate-in fade-in duration-500">
                     <h3 className="text-xl font-bold text-slate-800">Student Reviews</h3>
                     <div className="flex items-center gap-4 bg-white p-6 rounded-xl border border-slate-200">
                        <div className="text-center px-6 border-r border-slate-100">
                           <div className="text-5xl font-black text-slate-800">{course.rating}</div>
                           <div className="flex justify-center text-amber-400 my-2">
                              {[1,2,3,4,5].map(s => <Star key={s} className={`w-4 h-4 ${s <= Math.round(course.rating) ? 'fill-current' : 'text-slate-300'}`} />)}
                           </div>
                           <div className="text-sm text-slate-500 font-bold">Course Rating</div>
                        </div>
                        <div className="flex-1 space-y-2">
                           {[5,4,3,2,1].map((stars, i) => (
                              <div key={stars} className="flex items-center gap-3 text-sm">
                                 <div className="w-12 h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-slate-400" style={{ width: i === 0 ? '70%' : i === 1 ? '20%' : '5%' }}></div>
                                 </div>
                                 <div className="flex text-amber-400">
                                    {[...Array(5)].map((_, j) => <Star key={j} className={`w-3 h-3 ${j < stars ? 'fill-current' : 'text-slate-200'}`} />)}
                                 </div>
                                 <span className="text-slate-400 text-xs">{(i === 0 ? 70 : i === 1 ? 20 : 5)}%</span>
                              </div>
                           ))}
                        </div>
                     </div>
                     
                     <div className="space-y-4">
                        {reviews.map(review => (
                           <div key={review.id} className="bg-white p-6 rounded-xl border border-slate-200">
                              <div className="flex justify-between items-start mb-4">
                                 <div className="flex items-center gap-3">
                                    <img src={review.userAvatar} className="w-10 h-10 rounded-full" alt={review.userName} />
                                    <div>
                                       <h4 className="font-bold text-slate-900 text-sm">{review.userName}</h4>
                                       <div className="flex items-center gap-2">
                                          <div className="flex text-amber-400">
                                             {[...Array(5)].map((_, j) => <Star key={j} className={`w-3 h-3 ${j < review.rating ? 'fill-current' : 'text-slate-300'}`} />)}
                                          </div>
                                          <span className="text-xs text-slate-400">{review.date}</span>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <p className="text-slate-600 text-sm leading-relaxed">{review.comment}</p>
                           </div>
                        ))}
                     </div>
                  </div>
                )}
             </div>
          </div>
          
          {/* Spacer for desktop layout column */}
          <div className="hidden lg:block w-96 shrink-0"></div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
