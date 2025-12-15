
import React, { useState, useEffect, useRef } from 'react';
import { CHAT_ROOMS, MOCK_MESSAGES, MOCK_USER } from '../constants';
import { Message, ChatRoom } from '../types';
import { 
    Send, Phone, Video, Info, Paperclip, Mic, Smile, MoreVertical, Search, 
    Bot, Plus, MessageSquare, Check, CheckCheck, Pin, Image as ImageIcon,
    FileText, X, Reply, Trash2, Bell, BellOff, Users, Hash
} from 'lucide-react';

const Chat: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chats' | 'directory'>('chats');
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(CHAT_ROOMS[0].id);
  const [messageText, setMessageText] = useState('');
  const [chatRooms, setChatRooms] = useState(CHAT_ROOMS);
  const [messages, setMessages] = useState<Record<string, Message[]>>(MOCK_MESSAGES);
  const [showInfoSidebar, setShowInfoSidebar] = useState(false);
  const [activeThread, setActiveThread] = useState<Message | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedRoom = chatRooms.find(r => r.id === selectedRoomId);
  const currentMessages = selectedRoomId ? (messages[selectedRoomId] || []) : [];
  const pinnedMessage = currentMessages.find(m => m.isPinned);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages, selectedRoomId]);

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedRoomId) return;

    const newMessage: Message = {
      id: `new-${Date.now()}`,
      senderId: MOCK_USER.id,
      senderName: MOCK_USER.name,
      senderAvatar: MOCK_USER.avatar,
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
      status: 'sent',
    };

    setMessages(prev => ({
      ...prev,
      [selectedRoomId]: [...(prev[selectedRoomId] || []), newMessage]
    }));
    setMessageText('');
    
    // Simulate delivered/read status updates
    setTimeout(() => {
        setMessages(prev => ({
            ...prev,
            [selectedRoomId]: prev[selectedRoomId].map(m => m.id === newMessage.id ? { ...m, status: 'delivered' } : m)
        }));
    }, 1500);
    setTimeout(() => {
        setMessages(prev => ({
            ...prev,
            [selectedRoomId]: prev[selectedRoomId].map(m => m.id === newMessage.id ? { ...m, status: 'read' } : m)
        }));
    }, 3000);
  };

  const handleJoinRoom = (room: ChatRoom) => {
      // Logic to add user to participants would go here
      setSelectedRoomId(room.id);
      setActiveTab('chats');
  };

  const filteredRooms = chatRooms.filter(r => 
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
      (activeTab === 'chats' ? !r.isPublic || r.participants.some(p => p.id === MOCK_USER.id) : r.isPublic)
  );

  // Message Bubble Component
  const MessageBubble: React.FC<{ message: Message, isOwn: boolean, onReply: () => void }> = ({ message, isOwn, onReply }) => {
      return (
          <div className={`flex group mb-4 ${isOwn ? 'justify-end' : 'justify-start'}`}>
              {!isOwn && (
                  <img src={message.senderAvatar} className="w-8 h-8 rounded-full mr-2 self-end mb-1" alt={message.senderName} />
              )}
              <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} max-w-[70%]`}>
                  {/* Name for group chats */}
                  {!isOwn && selectedRoom?.type === 'group' && (
                      <span className="text-xs text-slate-500 ml-1 mb-1">{message.senderName}</span>
                  )}

                  {/* Bubble */}
                  <div className={`relative px-4 py-2.5 rounded-2xl shadow-sm text-sm ${
                      isOwn 
                        ? 'bg-emerald-600 text-white rounded-br-none' 
                        : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
                  }`}>
                      {/* Attachments */}
                      {message.attachments && message.attachments.map(att => (
                          <div key={att.id} className="mb-2">
                              {att.type === 'image' && (
                                  <img src={att.url} alt={att.name} className="rounded-lg max-w-full h-auto border border-white/20" />
                              )}
                              {att.type !== 'image' && (
                                  <div className={`flex items-center gap-2 p-2 rounded bg-black/10`}>
                                      <Paperclip className="w-4 h-4" />
                                      <span className="text-xs truncate">{att.name}</span>
                                  </div>
                              )}
                          </div>
                      ))}

                      {/* Text */}
                      <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
                      
                      {/* Meta */}
                      <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${isOwn ? 'text-emerald-100' : 'text-slate-400'}`}>
                          <span>{message.timestamp}</span>
                          {isOwn && (
                              <span>
                                  {message.status === 'sent' && <Check className="w-3 h-3" />}
                                  {message.status === 'delivered' && <CheckCheck className="w-3 h-3 opacity-70" />}
                                  {message.status === 'read' && <CheckCheck className="w-3 h-3 text-blue-300" />}
                              </span>
                          )}
                      </div>
                  </div>

                  {/* Reactions */}
                  {message.reactions && Object.keys(message.reactions).length > 0 && (
                      <div className="flex gap-1 mt-1">
                          {Object.entries(message.reactions).map(([emoji, users]: [string, any]) => (
                              <span key={emoji} className="bg-slate-100 text-xs px-1.5 py-0.5 rounded-full border border-slate-200 flex items-center">
                                  {emoji} <span className="ml-1 text-[10px] font-bold text-slate-500">{(users as string[]).length}</span>
                              </span>
                          ))}
                      </div>
                  )}

                  {/* Actions (Hover) */}
                  <div className={`flex gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity ${isOwn ? 'mr-1' : 'ml-1'}`}>
                       <button onClick={onReply} className="text-slate-400 hover:text-emerald-600 p-1 rounded-full hover:bg-slate-100"><Reply className="w-3.5 h-3.5" /></button>
                       <button className="text-slate-400 hover:text-yellow-500 p-1 rounded-full hover:bg-slate-100"><Smile className="w-3.5 h-3.5" /></button>
                       <button className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100"><MoreVertical className="w-3.5 h-3.5" /></button>
                  </div>
              </div>
          </div>
      );
  };

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-white">
      {/* 1. Left Sidebar */}
      <div className="w-full md:w-80 border-r border-slate-200 flex flex-col shrink-0">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-50">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-800">Messages</h2>
                <button className="p-2 bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200 transition-colors">
                    <Plus className="w-4 h-4" />
                </button>
            </div>
            {/* Tabs */}
            <div className="flex bg-slate-200 p-1 rounded-lg mb-3">
                <button 
                    onClick={() => setActiveTab('chats')} 
                    className={`flex-1 text-xs font-bold py-1.5 rounded-md transition-all ${activeTab === 'chats' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    My Chats
                </button>
                <button 
                    onClick={() => setActiveTab('directory')} 
                    className={`flex-1 text-xs font-bold py-1.5 rounded-md transition-all ${activeTab === 'directory' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Browse Rooms
                </button>
            </div>
            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={activeTab === 'chats' ? "Search conversations..." : "Find public groups..."}
                    className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
            </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
            {filteredRooms.length > 0 ? (
                filteredRooms.map(room => (
                    <div 
                        key={room.id}
                        onClick={() => activeTab === 'chats' ? setSelectedRoomId(room.id) : handleJoinRoom(room)}
                        className={`p-4 flex items-center cursor-pointer border-b border-slate-50 transition-colors hover:bg-slate-50 ${selectedRoomId === room.id && activeTab === 'chats' ? 'bg-emerald-50 border-l-4 border-l-emerald-500' : ''}`}
                    >
                        <div className="relative mr-3 shrink-0">
                            {room.type === 'group' ? (
                                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                    <Users className="w-6 h-6" />
                                </div>
                            ) : (
                                <img 
                                    src={`https://picsum.photos/seed/${room.id}/50/50`} 
                                    alt={room.name} 
                                    className="w-12 h-12 rounded-full object-cover" 
                                />
                            )}
                            {activeTab === 'chats' && room.unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                                    {room.unreadCount}
                                </span>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className={`text-sm font-bold truncate ${selectedRoomId === room.id ? 'text-emerald-900' : 'text-slate-800'}`}>{room.name}</h3>
                                {activeTab === 'chats' && <span className="text-[10px] text-slate-400 font-medium">{room.lastMessageTime}</span>}
                            </div>
                            <p className="text-xs text-slate-500 truncate">
                                {activeTab === 'chats' ? (
                                    <>
                                        {room.lastMessage.startsWith('You:') && <span className="font-semibold text-slate-400">You: </span>}
                                        {room.lastMessage}
                                    </>
                                ) : (
                                    room.description || `${room.participants.length} members`
                                )}
                            </p>
                        </div>
                        {activeTab === 'directory' && (
                            <button className="ml-2 px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full hover:bg-emerald-200">
                                Join
                            </button>
                        )}
                    </div>
                ))
            ) : (
                <div className="p-8 text-center text-slate-500">
                    <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-20" />
                    <p className="text-sm">No chats found.</p>
                </div>
            )}
        </div>
      </div>

      {/* 2. Chat Area */}
      <div className="hidden md:flex flex-1 flex-col bg-slate-50 relative">
        {selectedRoom ? (
            <>
                {/* Header */}
                <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm shrink-0">
                    <div className="flex items-center cursor-pointer" onClick={() => setShowInfoSidebar(!showInfoSidebar)}>
                        {selectedRoom.type === 'group' ? (
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mr-3">
                                <Hash className="w-5 h-5" />
                            </div>
                        ) : (
                            <img src={`https://picsum.photos/seed/${selectedRoom.id}/50/50`} className="w-10 h-10 rounded-full object-cover mr-3" alt="Avatar" />
                        )}
                        <div>
                            <h3 className="font-bold text-slate-800">{selectedRoom.name}</h3>
                            <div className="flex items-center text-xs text-slate-500">
                                {selectedRoom.type === 'group' ? (
                                    <span>{selectedRoom.participants.length} members</span>
                                ) : (
                                    <span className="text-emerald-600 flex items-center"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5"></span> Online</span>
                                )}
                                {selectedRoom.isMuted && <BellOff className="w-3 h-3 ml-2 text-slate-400" />}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-slate-100 rounded-full transition-colors"><Search className="w-5 h-5" /></button>
                        <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-slate-100 rounded-full transition-colors"><Phone className="w-5 h-5" /></button>
                        <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-slate-100 rounded-full transition-colors"><Video className="w-5 h-5" /></button>
                        <button className={`p-2 rounded-full transition-colors ${showInfoSidebar ? 'bg-emerald-50 text-emerald-600' : 'text-slate-400 hover:bg-slate-100'}`} onClick={() => setShowInfoSidebar(!showInfoSidebar)}>
                            <Info className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Pinned Message */}
                {pinnedMessage && (
                    <div className="bg-amber-50 px-6 py-2 border-b border-amber-100 flex items-center justify-between text-xs font-medium text-amber-800 shrink-0">
                        <div className="flex items-center gap-2 truncate">
                            <Pin className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
                            <span className="font-bold">Pinned:</span>
                            <span className="truncate max-w-md">{pinnedMessage.text}</span>
                        </div>
                        <button className="text-amber-600 hover:text-amber-900">View</button>
                    </div>
                )}

                {/* Messages Feed */}
                <div className="flex-1 overflow-y-auto p-6">
                    {currentMessages.length > 0 ? (
                        currentMessages.map(msg => (
                            <MessageBubble 
                                key={msg.id} 
                                message={msg} 
                                isOwn={msg.senderId === MOCK_USER.id} 
                                onReply={() => setActiveThread(msg)}
                            />
                        ))
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                <MessageSquare className="w-8 h-8 opacity-20" />
                            </div>
                            <p>No messages yet. Start the conversation!</p>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-slate-200 shrink-0">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3">
                            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                                <Plus className="w-6 h-6" />
                            </button>
                            <div className="flex-1 relative bg-slate-100 rounded-2xl flex items-center px-2">
                                <input 
                                    type="text" 
                                    value={messageText}
                                    onChange={(e) => setMessageText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Type a message..." 
                                    className="flex-1 bg-transparent border-none focus:ring-0 py-3 pl-2 pr-2 text-sm text-slate-800 placeholder-slate-400"
                                />
                                <button className="p-2 text-slate-400 hover:text-slate-600"><Smile className="w-5 h-5" /></button>
                                <button className="p-2 text-slate-400 hover:text-slate-600"><ImageIcon className="w-5 h-5" /></button>
                                <button className="p-2 text-slate-400 hover:text-slate-600"><Mic className="w-5 h-5" /></button>
                            </div>
                            <button 
                                onClick={handleSendMessage}
                                disabled={!messageText.trim()}
                                className={`p-3 rounded-full transition-all duration-200 shadow-md ${
                                    messageText.trim() 
                                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 hover:scale-105' 
                                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                }`}
                            >
                                <Send className="w-5 h-5 ml-0.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </>
        ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
                    <MessageSquare className="w-10 h-10 opacity-30" />
                </div>
                <h3 className="text-lg font-bold text-slate-600">Your Messages</h3>
                <p className="text-sm">Select a chat to start messaging or browse new groups.</p>
            </div>
        )}
      </div>

      {/* 3. Right Sidebar (Thread / Info) */}
      {(showInfoSidebar || activeThread) && (
          <div className="w-80 border-l border-slate-200 bg-white flex flex-col shrink-0 animate-in slide-in-from-right duration-300 absolute right-0 top-0 bottom-0 z-10 shadow-2xl md:static md:shadow-none">
              
              {/* Thread View */}
              {activeThread ? (
                  <>
                    <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
                        <button onClick={() => setActiveThread(null)} className="p-1 hover:bg-slate-200 rounded"><X className="w-5 h-5" /></button>
                        <h3 className="font-bold text-slate-800">Thread</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
                        <div className="mb-6 relative">
                            <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-slate-200"></div>
                            <MessageBubble message={activeThread} isOwn={activeThread.senderId === MOCK_USER.id} onReply={() => {}} />
                        </div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 pl-2">Replies</h4>
                        {activeThread.replies && activeThread.replies.length > 0 ? (
                            activeThread.replies.map(r => (
                                <MessageBubble key={r.id} message={r} isOwn={r.senderId === MOCK_USER.id} onReply={() => {}} />
                            ))
                        ) : (
                            <p className="text-sm text-slate-400 text-center italic">No replies yet.</p>
                        )}
                    </div>
                    <div className="p-3 border-t border-slate-200">
                        <input type="text" placeholder="Reply to thread..." className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-emerald-500 outline-none" />
                    </div>
                  </>
              ) : (
                  // Info View
                  <>
                    <div className="p-6 border-b border-slate-200 flex flex-col items-center relative">
                        <button onClick={() => setShowInfoSidebar(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 md:hidden"><X className="w-5 h-5" /></button>
                        <img 
                            src={`https://picsum.photos/seed/${selectedRoom?.id}/100/100`} 
                            className="w-20 h-20 rounded-full object-cover mb-4 ring-4 ring-slate-50" 
                            alt="Room" 
                        />
                        <h2 className="text-lg font-bold text-slate-800 text-center">{selectedRoom?.name}</h2>
                        <p className="text-sm text-slate-500 mb-4">{selectedRoom?.type === 'group' ? 'Group Chat' : 'Direct Message'}</p>
                        
                        <div className="flex gap-4">
                            <button className="flex flex-col items-center gap-1 text-slate-500 hover:text-emerald-600">
                                <div className="p-2.5 bg-slate-100 rounded-full hover:bg-emerald-50 transition-colors"><Bell className="w-5 h-5" /></div>
                                <span className="text-xs font-medium">Mute</span>
                            </button>
                            <button className="flex flex-col items-center gap-1 text-slate-500 hover:text-emerald-600">
                                <div className="p-2.5 bg-slate-100 rounded-full hover:bg-emerald-50 transition-colors"><Search className="w-5 h-5" /></div>
                                <span className="text-xs font-medium">Search</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        <div className="p-4">
                             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Participants</h3>
                             <div className="space-y-3">
                                {selectedRoom?.participants.map(p => (
                                    <div key={p.id} className="flex items-center gap-3">
                                        <img src={p.avatar} className="w-8 h-8 rounded-full" alt={p.name} />
                                        <div>
                                            <p className="text-sm font-semibold text-slate-800">{p.name}</p>
                                            <p className="text-xs text-slate-500">{p.role}</p>
                                        </div>
                                    </div>
                                ))}
                                {(!selectedRoom?.participants || selectedRoom.participants.length === 0) && (
                                    <p className="text-sm text-slate-400">No participant info available.</p>
                                )}
                             </div>
                        </div>
                        <div className="p-4 border-t border-slate-100">
                             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Shared Media</h3>
                             <div className="grid grid-cols-3 gap-2">
                                <div className="aspect-square bg-slate-100 rounded-lg"></div>
                                <div className="aspect-square bg-slate-100 rounded-lg"></div>
                                <div className="aspect-square bg-slate-100 rounded-lg"></div>
                             </div>
                        </div>
                    </div>
                  </>
              )}
          </div>
      )}
    </div>
  );
};

export default Chat;
