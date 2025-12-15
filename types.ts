
export enum UserRole {
  STUDENT = 'Student',
  FARMER = 'Farmer',
  ADMIN = 'Admin',
  SUPER_ADMIN = 'Super Admin'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  location?: string;
  xp: number;
  badges: string[];
  status?: 'Active' | 'Suspended' | 'Pending';
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  totalLessons: number;
  duration: string; // e.g. "4h 30m"
  progress?: number; // 0-100
  language: string;
  description: string;
  price?: number;
  level?: string;
  lastUpdated?: string;
  certificates?: boolean;
  learningOutcomes?: string[];
  requirements?: string[];
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  type: 'video' | 'article' | 'quiz';
  duration: string;
  completed: boolean;
  resources?: { name: string; type: 'pdf' | 'video' | 'audio'; url: string }[];
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  timestamp: string;
  likes: number;
  isSolution?: boolean;
  replies?: Comment[];
}

export interface ForumPost {
  id: string;
  author: User;
  title: string;
  content: string;
  category: 'General' | 'Technical' | 'Marketplace' | 'Announcements';
  tags: string[];
  likes: number; // Legacy, can use upvotes/downvotes
  upvotes: number;
  downvotes: number;
  views: number;
  comments: number;
  timestamp: string;
  isSolution?: boolean;
  pinned?: boolean;
}

export interface ChatRoom {
  id: string;
  name: string;
  type: 'direct' | 'group';
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  participants: User[];
  isMuted?: boolean;
  pinnedMessageId?: string;
  description?: string;
  isPublic?: boolean;
}

export interface Attachment {
  id: string;
  type: 'image' | 'video' | 'file' | 'audio';
  url: string;
  name: string;
  size?: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName?: string;
  senderAvatar?: string;
  text: string;
  timestamp: string;
  type: 'text' | 'image' | 'file';
  status?: 'sent' | 'delivered' | 'read';
  isPinned?: boolean;
  reactions?: Record<string, string[]>; // emoji -> userIds
  attachments?: Attachment[];
  replies?: Message[];
}

export interface WeatherData {
  day: string;
  temp: number;
  humidity: number;
  condition: 'Sunny' | 'Cloudy' | 'Rainy' | 'Stormy';
  rainfall?: number; // mm
}

export interface WeatherAlert {
  id: string;
  type: 'warning' | 'alert' | 'info';
  title: string;
  message: string;
  date: string;
}

export interface FarmInsight {
  id: string;
  title: string;
  description: string;
  type: 'planting' | 'irrigation' | 'harvest' | 'pest';
  impact: 'High' | 'Medium' | 'Low';
}

export interface Note {
  id: string;
  lessonId: string;
  content: string;
  timestamp: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

// Admin Types
export interface SystemLog {
  id: string;
  module: 'auth' | 'forum' | 'chat' | 'course';
  level: 'info' | 'warning' | 'error';
  action: string;
  user: string;
  ip: string;
  timestamp: string;
}

export type ReportReason = 'spam' | 'harassment' | 'inappropriate' | 'other';

export interface UserReport {
  id: string;
  reportedUserId: string;
  reportedUserName: string;
  reporterName: string;
  reason: ReportReason;
  status: 'pending' | 'resolved' | 'dismissed';
  contentId?: string;
  contentType: 'post' | 'comment' | 'message';
  timestamp: string;
}

// Quiz Types
export type QuestionType = 'single' | 'multiple' | 'boolean';

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  text: string;
  type: QuestionType;
  options: QuizOption[];
  correctAnswerIds: string[];
  explanation: string;
  points: number;
}

export interface Quiz {
  id: string; // Linked to lessonId
  title: string;
  description?: string;
  timeLimit: number; // in minutes
  questions: QuizQuestion[];
  passingScore: number; // percentage
}

export interface Certificate {
  id: string;
  courseId: string;
  courseTitle: string;
  studentName: string;
  dateEarned: string;
  verificationCode: string;
  imageUrl: string;
}

// Student Dashboard Types
export interface Assignment {
  id: string;
  title: string;
  courseName: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: string;
}

export interface Activity {
  id: string;
  type: 'course' | 'quiz' | 'forum' | 'achievement';
  title: string;
  description: string;
  timestamp: string;
}

// Farmer Dashboard Types
export interface MarketItem {
  id: string;
  commodity: string;
  price: number;
  unit: string; // e.g., "per bushel", "per kg"
  trend: 'up' | 'down' | 'stable';
  change: number; // percentage
}

export interface FarmTask {
  id: string;
  title: string;
  status: 'pending' | 'completed' | 'in-progress';
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  description: string;
  amount: number;
  date: string;
  category: string;
}

// Community & About Types
export interface VRGame {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  players: number;
  rating: number;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  quote: string;
}
