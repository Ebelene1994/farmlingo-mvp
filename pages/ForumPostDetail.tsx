
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FORUM_POSTS, MOCK_COMMENTS } from '../constants';
import { Comment } from '../types';
import { 
    ArrowLeft, ArrowBigUp, ArrowBigDown, MessageSquare, Share2, Flag, 
    MoreHorizontal, Clock, Tag, Award, CheckCircle, Reply, User as UserIcon
} from 'lucide-react';

const ForumPostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const post = FORUM_POSTS.find(p => p.id === postId);

  // Local state for the detail view
  const [replyContent, setReplyContent] = useState('');
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const [votes, setVotes] = useState<Record<string, 'up' | 'down' | null>>({});

  if (!post) {
    return (
        <div className="p-12 text-center">
            <h2 className="text-xl font-bold text-slate-800">Post not found</h2>
            <Link to="/community" className="text-emerald-600 hover:underline mt-2 block">Back to Community</Link>
        </div>
    );
  }

  const handleVote = (id: string, type: 'up' | 'down') => {
      setVotes(prev => {
          const current = prev[id];
          if (current === type) return { ...prev, [id]: null };
          return { ...prev, [id]: type };
      });
  };

  const handleReplySubmit = () => {
      if (!replyContent.trim()) return;
      
      const newComment: Comment = {
          id: `new-${Date.now()}`,
          author: { 
              id: 'me', 
              name: 'Me', 
              email: 'me@test.com', 
              role: 'Student' as any, 
              avatar: 'https://picsum.photos/seed/me/50/50', 
              xp: 100, 
              badges: [] 
          },
          content: replyContent,
          timestamp: 'Just now',
          likes: 0,
          replies: []
      };

      setComments([...comments, newComment]);
      setReplyContent('');
  };

  // Recursive Comment Component
  const CommentThread: React.FC<{ comment: Comment, depth?: number }> = ({ comment, depth = 0 }) => {
      const [isCollapsed, setIsCollapsed] = useState(false);
      const [showReplyInput, setShowReplyInput] = useState(false);

      return (
          <div className={`mt-4 ${depth > 0 ? 'ml-6 pl-4 border-l-2 border-slate-100' : ''}`}>
              <div className="flex gap-3 group">
                  <div className="flex flex-col items-center">
                      <img src={comment.author.avatar} alt={comment.author.name} className="w-8 h-8 rounded-full shadow-sm" />
                      {depth === 0 && (
                          <div className="mt-2 h-full w-0.5 bg-slate-100 group-last:bg-transparent"></div>
                      )}
                  </div>
                  
                  <div className="flex-1">
                      <div className={`bg-slate-50 p-4 rounded-xl rounded-tl-none border ${comment.isSolution ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-100'}`}>
                          <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                  <span className="font-semibold text-sm text-slate-900">{comment.author.name}</span>
                                  {comment.author.badges?.map(b => (
                                      <span key={b} className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded uppercase">{b}</span>
                                  ))}
                                  <span className="text-xs text-slate-400">• {comment.timestamp}</span>
                              </div>
                              {comment.isSolution && (
                                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                                      <CheckCircle className="w-3 h-3" /> Solution
                                  </span>
                              )}
                          </div>
                          <p className="text-sm text-slate-700 whitespace-pre-wrap">{comment.content}</p>
                      </div>
                      
                      <div className="flex items-center gap-4 mt-1 ml-1">
                          <button className="text-xs font-semibold text-slate-500 hover:text-emerald-600 flex items-center gap-1">
                              <ArrowBigUp className="w-4 h-4" /> {comment.likes}
                          </button>
                          <button 
                            onClick={() => setShowReplyInput(!showReplyInput)}
                            className="text-xs font-semibold text-slate-500 hover:text-slate-700 flex items-center gap-1"
                          >
                              <Reply className="w-3 h-3" /> Reply
                          </button>
                          <button className="text-xs font-semibold text-slate-500 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">Report</button>
                      </div>

                      {showReplyInput && (
                          <div className="mt-2 flex gap-2">
                              <input type="text" className="flex-1 border border-slate-200 rounded px-2 py-1 text-sm" placeholder="Write a reply..." />
                              <button className="text-xs bg-emerald-600 text-white px-3 py-1 rounded">Post</button>
                          </div>
                      )}

                      {!isCollapsed && comment.replies?.map(reply => (
                          <CommentThread key={reply.id} comment={reply} depth={depth + 1} />
                      ))}
                  </div>
              </div>
          </div>
      );
  };

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen">
        <button 
            onClick={() => navigate('/community')}
            className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 mb-6 transition-colors"
        >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Discussions
        </button>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
            <div className="p-6 md:p-8">
                {/* Header */}
                <div className="flex gap-4">
                    <div className="flex flex-col items-center gap-1 pt-1">
                        <button onClick={() => handleVote(post.id, 'up')} className={`p-1 rounded hover:bg-slate-100 ${votes[post.id] === 'up' ? 'text-emerald-600' : 'text-slate-400'}`}>
                            <ArrowBigUp className={`w-8 h-8 ${votes[post.id] === 'up' ? 'fill-current' : ''}`} />
                        </button>
                        <span className={`font-bold text-lg ${votes[post.id] === 'up' ? 'text-emerald-600' : votes[post.id] === 'down' ? 'text-red-500' : 'text-slate-600'}`}>
                            {post.upvotes - post.downvotes + (votes[post.id] === 'up' ? 1 : votes[post.id] === 'down' ? -1 : 0)}
                        </span>
                        <button onClick={() => handleVote(post.id, 'down')} className={`p-1 rounded hover:bg-slate-100 ${votes[post.id] === 'down' ? 'text-red-500' : 'text-slate-400'}`}>
                            <ArrowBigDown className={`w-8 h-8 ${votes[post.id] === 'down' ? 'fill-current' : ''}`} />
                        </button>
                    </div>

                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2 py-0.5 rounded border border-slate-200 uppercase">
                                {post.category}
                            </span>
                            {post.tags.map(tag => (
                                <span key={tag} className="flex items-center text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                                    <Tag className="w-3 h-3 mr-1" /> {tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{post.title}</h1>

                        <div className="flex items-center justify-between py-4 border-y border-slate-100 mb-6">
                            <div className="flex items-center gap-3">
                                <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full" />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-slate-900">{post.author.name}</span>
                                        {post.author.badges?.map(badge => (
                                            <span key={badge} className="text-[10px] font-bold px-1.5 py-0.5 rounded border bg-blue-50 text-blue-600 border-blue-100 uppercase">
                                                {badge}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center text-xs text-slate-500 gap-2">
                                        <Clock className="w-3 h-3" />
                                        <span>Posted {post.timestamp}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors"><Share2 className="w-5 h-5" /></button>
                                <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors"><Flag className="w-5 h-5" /></button>
                                <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
                            </div>
                        </div>

                        <div className="prose prose-slate max-w-none mb-8">
                            <p className="text-lg text-slate-700 leading-relaxed">{post.content}</p>
                            {/* Placeholder for potential rich content/images in post */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Comment Section Header */}
            <div className="bg-slate-50 p-6 border-t border-slate-200">
                <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
                    <MessageSquare className="w-5 h-5" /> {comments.length} Responses
                </h3>

                {/* Reply Box */}
                <div className="flex gap-4 mb-10">
                    <img src="https://picsum.photos/seed/me/50/50" className="w-10 h-10 rounded-full border border-slate-200" alt="Me" />
                    <div className="flex-1">
                        <div className="relative">
                            <textarea 
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none text-sm shadow-sm"
                                placeholder="Add to the discussion..."
                                rows={3}
                            ></textarea>
                            <button 
                                onClick={handleReplySubmit}
                                disabled={!replyContent.trim()}
                                className="absolute bottom-3 right-3 bg-emerald-600 text-white px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Post Reply
                            </button>
                        </div>
                    </div>
                </div>

                {/* Comments List */}
                <div className="space-y-6">
                    {comments.map(comment => (
                        <CommentThread key={comment.id} comment={comment} />
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default ForumPostDetail;
