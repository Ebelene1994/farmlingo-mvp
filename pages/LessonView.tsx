
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Play, FileText, ChevronLeft, ChevronRight, HelpCircle, AlertCircle, Save, Download, File, Video, Headphones, Edit3, Trash2, Check } from 'lucide-react';
import { COURSES, MOCK_LESSONS } from '../constants';
import { Note, Lesson } from '../types';

const LessonView: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Course ID
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'content' | 'discussion' | 'notes'>('content');
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [noteContent, setNoteContent] = useState('');
  const [savedNotes, setSavedNotes] = useState<Note[]>([]);
  const [showToast, setShowToast] = useState(false);
  
  // Use MOCK_LESSONS from constants, but track local state for 'completed' toggle in this view
  // In a real app, this would come from a backend or global store
  const [lessons, setLessons] = useState<Lesson[]>(MOCK_LESSONS);

  const currentLesson = lessons[currentLessonIndex];
  const course = COURSES.find(c => c.id === id) || COURSES[0];
  const relatedCourses = COURSES.filter(c => c.id !== course.id && c.category === course.category).slice(0, 2);

  const handleSaveNote = () => {
      if (!noteContent.trim()) return;
      const newNote: Note = {
          id: Date.now().toString(),
          lessonId: currentLesson.id,
          content: noteContent,
          timestamp: new Date().toLocaleDateString()
      };
      setSavedNotes([newNote, ...savedNotes]);
      setNoteContent('');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
  };

  const markAsCompleted = (index: number) => {
      const updatedLessons = [...lessons];
      updatedLessons[index].completed = true;
      setLessons(updatedLessons);
  };

  const handleNextLesson = () => {
      // If currently on a quiz, navigate to quiz player
      if (currentLesson.type === 'quiz') {
          navigate(`/quiz/${currentLesson.id}`);
          return;
      }

      markAsCompleted(currentLessonIndex);
      if (currentLessonIndex < lessons.length - 1) {
          setCurrentLessonIndex(prev => prev + 1);
      }
  };

  const completedCount = lessons.filter(l => l.completed).length;
  const progressPercent = Math.round((completedCount / lessons.length) * 100);

  const getResourceIcon = (type: string) => {
      switch(type) {
          case 'pdf': return <File className="w-5 h-5 text-red-500" />;
          case 'audio': return <Headphones className="w-5 h-5 text-purple-500" />;
          case 'video': return <Video className="w-5 h-5 text-blue-500" />;
          default: return <Download className="w-5 h-5 text-slate-500" />;
      }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-slate-50">
      {/* Top Bar for Lesson */}
      <div className="bg-slate-900 text-white px-4 md:px-6 py-3 flex items-center justify-between shrink-0 shadow-md z-30">
        <button onClick={() => navigate(`/courses/${id}`)} className="flex items-center text-slate-300 hover:text-white text-sm transition-colors group">
            <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Course
        </button>
        <h1 className="text-sm md:text-base font-semibold truncate max-w-xs md:max-w-md mx-4 hidden sm:block">{course.title}</h1>
        <div className="flex items-center text-xs text-slate-400">
            <span className="mr-3 font-medium">{Math.round(progressPercent)}% Completed</span>
            <div className="w-24 bg-slate-700 rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${progressPercent}%` }}></div>
            </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-black relative flex flex-col">
            <div className="flex-1 flex flex-col relative">
                {currentLesson.type === 'video' ? (
                    <div className="flex-1 bg-slate-950 flex flex-col">
                        <div className="relative flex-1 flex items-center justify-center min-h-[300px] lg:min-h-[400px]">
                            {/* Fake Video Player */}
                            <div className="w-full max-w-5xl aspect-video bg-slate-900 relative group cursor-pointer shadow-2xl mx-auto overflow-hidden">
                                <img 
                                    src={`https://picsum.photos/seed/${currentLesson.id}/1200/675`} 
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-300" 
                                    alt="Video Thumbnail"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-20 h-20 bg-emerald-600/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-emerald-900/50 backdrop-blur-sm">
                                        <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                                    </div>
                                </div>
                                <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <h3 className="text-lg font-bold">{currentLesson.title}</h3>
                                    <p className="text-sm text-slate-300">Click to start playing</p>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10">
                                    <div className="h-full bg-emerald-500 w-1/3 relative">
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow hover:scale-125 transition-transform"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : currentLesson.type === 'quiz' ? (
                    <div className="flex-1 bg-slate-100 p-8 flex items-center justify-center">
                        <div className="bg-white max-w-2xl w-full p-10 rounded-2xl shadow-xl border border-slate-200 text-center">
                            <div className="inline-flex items-center justify-center p-4 bg-emerald-100 rounded-full mb-6 text-emerald-600">
                                <HelpCircle className="w-10 h-10" />
                            </div>
                            <h2 className="text-3xl font-bold text-slate-800 mb-2">{currentLesson.title}</h2>
                            <p className="text-slate-500 mb-8 max-w-md mx-auto">
                                Test your knowledge of the concepts covered in this module. You need 70% to pass.
                            </p>
                            
                            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-8 text-sm text-slate-600">
                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    <span className="block font-bold text-slate-900 text-lg">5</span> Questions
                                </div>
                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    <span className="block font-bold text-slate-900 text-lg">10m</span> Time Limit
                                </div>
                            </div>

                            <button 
                                onClick={() => navigate(`/quiz/${currentLesson.id}`)}
                                className="bg-emerald-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 w-full sm:w-auto"
                            >
                                Start Quiz Now
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 bg-white p-8 md:p-12 overflow-y-auto">
                        <div className="max-w-3xl mx-auto prose prose-slate prose-lg">
                            <h1 className="text-3xl font-bold text-slate-900 mb-4">{currentLesson.title}</h1>
                            <div className="flex items-center gap-2 text-sm text-slate-500 mb-8 pb-8 border-b border-slate-100">
                                <span className="flex items-center"><FileText className="w-4 h-4 mr-1" /> Article</span>
                                <span>•</span>
                                <span>{currentLesson.duration} read</span>
                            </div>
                            <p className="lead text-xl text-slate-600">Understanding the composition of your soil is crucial for sustainable farming.</p>
                            <p>Soil consists of mineral particles, organic matter, water, and air. The balance of these components determines the soil's ability to support plant growth...</p>
                            <h3>The Three Primary Particles</h3>
                            <p>Soil texture is defined by the proportion of three mineral particles:</p>
                            <ul>
                                <li><strong>Sand:</strong> The largest particle size, feels gritty.</li>
                                <li><strong>Silt:</strong> Medium size, feels like flour.</li>
                                <li><strong>Clay:</strong> The smallest size, feels sticky when wet.</li>
                            </ul>
                            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
                                <h4 className="font-bold text-amber-900 m-0 mb-2 flex items-center"><AlertCircle className="w-5 h-5 mr-2" /> Pro Tip</h4>
                                <p className="text-amber-800 m-0">Always test your soil pH before applying fertilizers. A balanced pH ensures nutrients are accessible to roots.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Controls */}
            <div className="bg-white border-t border-slate-200 p-4 flex justify-between items-center shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-20">
                <button 
                    disabled={currentLessonIndex === 0}
                    onClick={() => setCurrentLessonIndex(prev => prev - 1)}
                    className="flex items-center px-5 py-2.5 text-slate-600 font-medium hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 rounded-lg transition-colors"
                >
                    <ChevronLeft className="w-5 h-5 mr-1" /> Previous
                </button>
                
                <div className="hidden sm:flex flex-col items-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">Current Lesson</span>
                    <span className="text-sm font-semibold text-slate-800 truncate max-w-[200px]">{currentLesson.title}</span>
                </div>

                <button 
                    onClick={handleNextLesson}
                    disabled={currentLessonIndex === lessons.length - 1 && currentLesson.completed && currentLesson.type !== 'quiz'}
                    className="flex items-center px-6 py-2.5 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                    {currentLesson.type === 'quiz' ? 'Start Quiz' : (currentLessonIndex === lessons.length - 1 ? 'Complete Course' : 'Next Lesson')} <ChevronRight className="w-5 h-5 ml-2" />
                </button>
            </div>
        </div>

        {/* Sidebar (Playlist/Tabs) */}
        <div className="w-96 border-l border-slate-200 bg-white hidden lg:flex flex-col z-20 shadow-xl">
            <div className="flex border-b border-slate-200 bg-slate-50">
                <button 
                    className={`flex-1 py-4 text-sm font-bold transition-all relative ${activeTab === 'content' ? 'text-emerald-700 bg-white shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'}`}
                    onClick={() => setActiveTab('content')}
                >
                    Content
                    {activeTab === 'content' && <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-500"></div>}
                </button>
                <button 
                    className={`flex-1 py-4 text-sm font-bold transition-all relative ${activeTab === 'notes' ? 'text-emerald-700 bg-white shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'}`}
                    onClick={() => setActiveTab('notes')}
                >
                    Notes
                    {activeTab === 'notes' && <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-500"></div>}
                </button>
                <button 
                    className={`flex-1 py-4 text-sm font-bold transition-all relative ${activeTab === 'discussion' ? 'text-emerald-700 bg-white shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'}`}
                    onClick={() => setActiveTab('discussion')}
                >
                    Discuss
                    {activeTab === 'discussion' && <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-500"></div>}
                </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
                {activeTab === 'content' && (
                    <div className="flex flex-col min-h-full">
                        {/* Progress Header */}
                        <div className="p-6 border-b border-slate-100 bg-white">
                            <h3 className="font-bold text-slate-800 text-lg mb-4">Course Progress</h3>
                            <div className="flex items-center gap-4">
                                <div className="relative w-16 h-16 shrink-0">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none" className="text-slate-100" />
                                        <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none" className="text-emerald-500 transition-all duration-1000" strokeDasharray={175} strokeDashoffset={175 - (175 * progressPercent) / 100} strokeLinecap="round" />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-emerald-600">
                                        {Math.round(progressPercent)}%
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-900">{completedCount} of {lessons.length} complete</p>
                                    <p className="text-xs text-slate-500 mt-1">Keep going! You're doing great.</p>
                                </div>
                            </div>
                        </div>

                        {/* Lesson List */}
                        <ul className="flex-1 py-2">
                            {lessons.map((lesson, idx) => (
                                <li 
                                    key={lesson.id} 
                                    onClick={() => setCurrentLessonIndex(idx)}
                                    className={`px-6 py-4 cursor-pointer transition-all flex items-start group border-l-[3px] ${currentLessonIndex === idx ? 'bg-emerald-50 border-emerald-500' : 'border-transparent hover:bg-slate-50'}`}
                                >
                                    <div className="mt-0.5 mr-4 shrink-0 transition-colors">
                                        {lesson.completed ? (
                                            <div className="bg-emerald-100 rounded-full p-1 text-emerald-600">
                                                <Check className="w-3 h-3" />
                                            </div>
                                        ) : (
                                            <div className={`rounded-full p-1 border-2 ${currentLessonIndex === idx ? 'border-emerald-500 bg-white' : 'border-slate-300 group-hover:border-slate-400'}`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${currentLessonIndex === idx ? 'bg-emerald-500' : 'bg-transparent'}`}></div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className={`text-sm font-semibold truncate ${currentLessonIndex === idx ? 'text-emerald-900' : 'text-slate-700'}`}>{lesson.title}</h4>
                                        <div className="flex items-center mt-1.5 text-xs text-slate-400 gap-2">
                                            {lesson.type === 'video' ? <Play className="w-3 h-3" /> : lesson.type === 'quiz' ? <HelpCircle className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                                            <span>{lesson.duration}</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {/* Resources Section */}
                        {currentLesson.resources && currentLesson.resources.length > 0 && (
                            <div className="p-6 bg-slate-50 border-t border-slate-200">
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center">
                                    <Download className="w-3 h-3 mr-2" /> Download Materials
                                </h4>
                                <div className="space-y-3">
                                    {currentLesson.resources.map((res, idx) => (
                                        <a key={idx} href={res.url} className="flex items-center p-3 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group">
                                            <div className="bg-slate-100 p-2.5 rounded-lg group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                                                {getResourceIcon(res.type)}
                                            </div>
                                            <div className="ml-3 flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-slate-800 truncate group-hover:text-emerald-700">{res.name}</p>
                                                <p className="text-[10px] text-slate-500 uppercase font-medium mt-0.5">{res.type}</p>
                                            </div>
                                            <div className="bg-slate-50 p-1.5 rounded-md text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                                <Download className="w-4 h-4" />
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {/* Related Courses */}
                        <div className="p-6 bg-white border-t border-slate-100 mt-auto">
                             <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Related Courses</h4>
                             <div className="space-y-3">
                                {relatedCourses.map(rc => (
                                    <div key={rc.id} className="flex gap-3 bg-slate-50 p-2 rounded-lg border border-slate-100 hover:border-emerald-200 hover:shadow-sm cursor-pointer transition-all group" onClick={() => navigate(`/courses/${rc.id}`)}>
                                        <img src={rc.thumbnail} className="w-12 h-12 object-cover rounded-md" alt={rc.title} />
                                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                                            <p className="text-sm font-semibold text-slate-800 truncate group-hover:text-emerald-700">{rc.title}</p>
                                            <p className="text-[10px] text-slate-500 font-medium">{rc.category}</p>
                                        </div>
                                    </div>
                                ))}
                             </div>
                        </div>
                    </div>
                )}

                {activeTab === 'notes' && (
                    <div className="p-6 h-full flex flex-col relative">
                        {showToast && (
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-emerald-800 text-white text-xs px-4 py-2 rounded-full shadow-lg flex items-center animate-bounce z-50">
                                <Check className="w-3 h-3 mr-1.5" /> Note saved successfully
                            </div>
                        )}
                        
                        <div className="mb-6 shrink-0">
                            <label className="block text-sm font-bold text-slate-800 mb-2">Private Lesson Notes</label>
                            <p className="text-xs text-slate-500 mb-3">Notes are private to you and synced across devices.</p>
                            <div className="relative group">
                                <textarea 
                                    className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none text-sm bg-slate-50 focus:bg-white transition-all shadow-inner"
                                    rows={5}
                                    placeholder="Write down key takeaways..."
                                    value={noteContent}
                                    onChange={(e) => setNoteContent(e.target.value)}
                                ></textarea>
                                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                                    <span className="text-[10px] text-slate-400">{noteContent.length} chars</span>
                                    <button 
                                        className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed transform active:scale-95"
                                        onClick={handleSaveNote}
                                        disabled={!noteContent.trim()}
                                        title="Save Note"
                                    >
                                        <Save className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto -mx-2 px-2">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center justify-between">
                                <span>Saved Notes</span>
                                <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px]">{savedNotes.length}</span>
                            </h4>
                            {savedNotes.length > 0 ? (
                                <div className="space-y-3 pb-4">
                                    {savedNotes.map(note => (
                                        <div key={note.id} className="bg-amber-50/50 p-4 rounded-xl border border-amber-100 hover:border-amber-200 transition-colors group relative shadow-sm">
                                            <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{note.content}</p>
                                            <div className="flex justify-between items-center mt-3 pt-3 border-t border-amber-100/50">
                                                <span className="text-[10px] text-amber-700/60 font-medium font-mono">{note.timestamp}</span>
                                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-1 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded"><Edit3 className="w-3.5 h-3.5" /></button>
                                                    <button className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded"><Trash2 className="w-3.5 h-3.5" /></button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/50">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm text-slate-300">
                                        <Edit3 className="w-6 h-6" />
                                    </div>
                                    <p className="text-sm font-semibold text-slate-600">No notes yet</p>
                                    <p className="text-xs text-slate-400 mt-1 max-w-150px mx-auto">Capture your thoughts while watching the lesson.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'discussion' && (
                    <div className="p-8 text-center mt-10">
                        <div className="inline-block p-4 rounded-full bg-indigo-50 text-indigo-500 mb-4">
                            <AlertCircle className="w-8 h-8" />
                        </div>
                        <h3 className="font-bold text-slate-800 mb-2">Discussion Forum</h3>
                        <p className="text-sm text-slate-500 mb-6 leading-relaxed">Have a question? Connect with other students and instructors in the community forum.</p>
                        <button className="w-full py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm">
                            View Thread
                        </button>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default LessonView;
