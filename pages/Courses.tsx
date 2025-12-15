import React, { useState, useEffect } from 'react';
import { COURSES } from '../constants';
import { Course } from '../types';
import { Search, Filter, Star, PlayCircle, Heart, Globe, Award, Sparkles, BookOpen, X, Clock, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Subcomponent: Course Card ---
interface CourseCardProps {
  course: Course;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent, id: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, isFavorite, onToggleFavorite }) => {
  const isStarted = course.progress !== undefined && course.progress > 0;

  return (
    <Link 
      to={`/courses/${course.id}`} 
      className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-emerald-200 transition-all duration-300 flex flex-col h-full relative"
    >
      {/* Thumbnail Section */}
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        
        {/* Favorite Button */}
        <button 
          onClick={(e) => onToggleFavorite(e, course.id)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white transition-colors z-20 group/fav shadow-sm"
        >
          <Heart 
            className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white group-hover/fav:text-red-500'}`} 
          />
        </button>

        {/* Language Badge */}
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs font-semibold text-white flex items-center">
          <Globe className="w-3 h-3 mr-1" />
          {course.language}
        </div>

        {/* Difficulty Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-slate-700 shadow-sm">
          {course.difficulty}
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
            {course.category}
          </span>
          <div className="flex items-center text-amber-400 text-xs font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
            <Star className="w-3 h-3 fill-current mr-1" />
            {course.rating}
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-tight">
          {course.title}
        </h3>
        <p className="text-sm text-slate-500 mb-4 line-clamp-2 flex-1">
          {course.description}
        </p>
        
        {/* Meta Data */}
        <div className="flex items-center gap-4 text-xs text-slate-500 font-medium mb-4 pt-4 border-t border-slate-100">
          <span className="flex items-center">
            <PlayCircle className="w-4 h-4 mr-1.5 text-slate-400" />
            {course.totalLessons} Lessons
          </span>
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1.5 text-slate-400" />
            {course.duration}
          </span>
        </div>

        {/* Action Footer */}
        <div className="mt-auto">
          {isStarted ? (
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-emerald-600">{course.progress}% Complete</span>
                <span className="text-slate-400">Resume</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
              </div>
            </div>
          ) : (
            <button className="w-full py-2.5 rounded-lg bg-slate-50 text-emerald-700 font-semibold text-sm hover:bg-emerald-600 hover:text-white transition-all duration-200 flex items-center justify-center group/btn">
              Enroll Now
              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

// --- Subcomponent: Pagination ---
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pages.push(i);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push('...');
      }
    }
    // Deduplicate and simplify logic for brief demo: simpler approach
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page as number)}
          className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all ${
            currentPage === page
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
              : 'text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-200'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

// --- Main Component: Courses Page ---
const Courses: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('All');
  const [filterLanguage, setFilterLanguage] = useState('All');
  const [filterRating, setFilterRating] = useState('All');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const categories = ['All', 'Soil Science', 'Crop Management', 'Technology', 'Business', 'Livestock'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const languages = ['All', 'English', 'Spanish', 'French'];
  const ratings = ['All', '4.5+', '4.0+', '3.5+'];

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterCategory, searchQuery, filterDifficulty, filterLanguage, filterRating, showFavoritesOnly]);

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const filteredCourses = COURSES.filter(c => {
    const matchesCategory = filterCategory === 'All' || c.category === filterCategory;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = filterDifficulty === 'All' || c.difficulty === filterDifficulty;
    const matchesLanguage = filterLanguage === 'All' || c.language === filterLanguage;
    const matchesFavorites = !showFavoritesOnly || favorites.has(c.id);
    
    let matchesRating = true;
    if (filterRating !== 'All') {
        const minRating = parseFloat(filterRating.replace('+', ''));
        matchesRating = c.rating >= minRating;
    }

    return matchesCategory && matchesSearch && matchesDifficulty && matchesLanguage && matchesFavorites && matchesRating;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const paginatedCourses = filteredCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const activeFiltersCount = [
      filterCategory !== 'All',
      filterDifficulty !== 'All',
      filterLanguage !== 'All',
      filterRating !== 'All',
      showFavoritesOnly
  ].filter(Boolean).length;

  const clearFilters = () => {
      setFilterCategory('All');
      setFilterDifficulty('All');
      setFilterLanguage('All');
      setFilterRating('All');
      setShowFavoritesOnly(false);
      setSearchQuery('');
  };

  // Recommended courses (just taking first 2 for demo if no search is active)
  const recommendedCourses = COURSES.slice(0, 2); 

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header & Search */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
                <h2 className="text-3xl font-bold text-slate-800">Course Library</h2>
                <p className="text-slate-500 mt-1 text-lg">Expand your farming knowledge with expert-led courses.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                 <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search courses, instructors..." 
                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm transition-shadow"
                    />
                </div>
            </div>
        </div>

        {/* Filters Panel */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex flex-col lg:flex-row gap-4 justify-between">
                <div className="flex flex-wrap gap-3 items-center">
                    <div className="flex items-center gap-2 text-slate-500 mr-2">
                        <Filter className="w-5 h-5" />
                        <span className="text-sm font-medium">Filters:</span>
                    </div>

                    <select 
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 hover:bg-white transition-colors cursor-pointer min-w-[120px]"
                    >
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>

                    <select 
                        value={filterDifficulty}
                        onChange={(e) => setFilterDifficulty(e.target.value)}
                        className="px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 hover:bg-white transition-colors cursor-pointer"
                    >
                        <option value="All">All Levels</option>
                        {difficulties.filter(d => d !== 'All').map(d => <option key={d} value={d}>{d}</option>)}
                    </select>

                    <select 
                        value={filterLanguage}
                        onChange={(e) => setFilterLanguage(e.target.value)}
                        className="px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 hover:bg-white transition-colors cursor-pointer"
                    >
                        <option value="All">All Languages</option>
                        {languages.filter(l => l !== 'All').map(l => <option key={l} value={l}>{l}</option>)}
                    </select>

                    <select 
                        value={filterRating}
                        onChange={(e) => setFilterRating(e.target.value)}
                        className="px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 hover:bg-white transition-colors cursor-pointer"
                    >
                        <option value="All">All Ratings</option>
                        {ratings.filter(r => r !== 'All').map(r => <option key={r} value={r}>{r} Stars</option>)}
                    </select>
                </div>

                <div className="flex items-center gap-3 border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6">
                    <button 
                        onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                        className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                            showFavoritesOnly 
                                ? 'bg-red-50 text-red-600 border border-red-200 shadow-sm' 
                                : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-white'
                        }`}
                    >
                        <Heart className={`w-4 h-4 mr-2 ${showFavoritesOnly ? 'fill-current' : ''}`} />
                        Wishlist
                        {favorites.size > 0 && <span className="ml-2 bg-white px-1.5 rounded-full text-xs border border-current font-bold">{favorites.size}</span>}
                    </button>

                    {activeFiltersCount > 0 && (
                        <button 
                            onClick={clearFilters}
                            className="text-sm text-slate-400 hover:text-red-500 flex items-center font-medium px-2 py-1 hover:bg-red-50 rounded transition-colors"
                        >
                            <X className="w-4 h-4 mr-1" /> Clear
                        </button>
                    )}
                </div>
            </div>
        </div>
      </div>

      {/* Recommended Section (Only if clean state) */}
      {searchQuery === '' && filterCategory === 'All' && !showFavoritesOnly && activeFiltersCount === 0 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2 text-emerald-700">
                <Sparkles className="w-5 h-5" />
                <h3 className="font-bold text-lg">Recommended for You</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendedCourses.map(course => (
                    <Link key={`rec-${course.id}`} to={`/courses/${course.id}`} className="group flex flex-col sm:flex-row bg-gradient-to-r from-emerald-50 to-white rounded-2xl border border-emerald-100 p-4 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
                        <img src={course.thumbnail} alt={course.title} className="w-full sm:w-48 h-48 sm:h-auto object-cover rounded-xl z-10 shadow-sm" />
                        <div className="flex-1 sm:ml-6 flex flex-col justify-between mt-4 sm:mt-1 z-10">
                            <div>
                                <div className="flex justify-between items-start">
                                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-white/50 px-2 py-1 rounded backdrop-blur-sm border border-emerald-100">{course.category}</span>
                                </div>
                                <h4 className="font-bold text-slate-800 mt-2 mb-2 text-lg group-hover:text-emerald-700 transition-colors">{course.title}</h4>
                                <p className="text-sm text-slate-500 line-clamp-2">{course.description}</p>
                            </div>
                            <div className="flex items-center gap-4 mt-4 text-xs font-medium text-slate-500">
                                <span className="flex items-center bg-slate-100 px-2 py-1 rounded"><Award className="w-3 h-3 mr-1.5" /> {course.difficulty}</span>
                                <span className="flex items-center bg-amber-50 px-2 py-1 rounded text-amber-700"><Star className="w-3 h-3 mr-1.5 fill-amber-400 text-amber-400" /> {course.rating}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
      )}

      {/* Main Course Grid */}
      <div className="space-y-6">
          <div className="flex justify-between items-end">
            <h3 className="font-bold text-xl text-slate-800">
                {showFavoritesOnly ? 'Your Wishlist' : (searchQuery ? 'Search Results' : 'All Courses')}
                <span className="ml-3 text-sm font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{filteredCourses.length} results</span>
            </h3>
          </div>

          {paginatedCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedCourses.map(course => (
                    <CourseCard 
                        key={course.id} 
                        course={course} 
                        isFavorite={favorites.has(course.id)} 
                        onToggleFavorite={toggleFavorite} 
                    />
                ))}
            </div>
          ) : (
            <div className="col-span-full py-20 text-center text-slate-500 bg-white rounded-xl border border-dashed border-slate-200">
                <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                    {showFavoritesOnly ? <Heart className="w-10 h-10 text-slate-300" /> : <BookOpen className="w-10 h-10 text-slate-300" />}
                </div>
                <p className="text-xl font-bold text-slate-800">{showFavoritesOnly ? 'No saved courses yet' : 'No courses found'}</p>
                <p className="text-slate-500 mt-2 max-w-sm mx-auto">
                    {showFavoritesOnly 
                        ? 'Save courses to your wishlist to find them easily later. Click the heart icon on any course.' 
                        : 'Try adjusting your filters or search terms to find what you are looking for.'}
                </p>
                <button 
                    onClick={clearFilters}
                    className="mt-8 px-8 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
                >
                    {showFavoritesOnly ? 'Browse All Courses' : 'Clear Filters'}
                </button>
            </div>
          )}
      </div>

      {/* Pagination */}
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
};

export default Courses;