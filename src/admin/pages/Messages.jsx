import React, { useState, useEffect } from 'react';
import { FaComment, FaWhatsapp, FaEnvelope, FaPhone, FaFilter, FaSearch, FaReply } from 'react-icons/fa';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    search: ''
  });
  const [loading, setLoading] = useState(true);

  // Mock messages data
  const mockMessages = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh@construction.com',
      phone: '+91 98765 43210',
      type: 'whatsapp',
      subject: 'Excavator Rental Inquiry',
      message: 'Hello, I need 2 JCB excavators for 30 days. Can you share the rates?',
      status: 'unread',
      timestamp: '2024-01-15T10:30:00Z',
      replies: []
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya@sharmabuilders.com',
      phone: '+91 87654 32109',
      type: 'website',
      subject: 'Loader and Tipper Rental',
      message: 'Looking for 3 loaders and 5 tippers for our township project.',
      status: 'read',
      timestamp: '2024-01-14T14:20:00Z',
      replies: [
        {
          id: 1,
          sender: 'Admin',
          message: 'We have the equipment available. Please check your email for quotation.',
          timestamp: '2024-01-14T15:30:00Z'
        }
      ]
    },
    {
      id: 3,
      name: 'Vikram Singh',
      email: 'vikram@singhinfra.com',
      phone: '+91 76543 21098',
      type: 'phone',
      subject: 'Monthly Rental Contract',
      message: 'Call me back to discuss long-term contract details.',
      status: 'unread',
      timestamp: '2024-01-13T09:15:00Z',
      replies: []
    },
    {
      id: 4,
      name: 'Anjali Mehta',
      email: 'anjali@mehtaprojects.com',
      phone: '+91 65432 10987',
      type: 'email',
      subject: 'Crane Rental Inquiry',
      message: 'Need 50-ton crane for bridge construction project. Please provide availability.',
      status: 'read',
      timestamp: '2024-01-12T16:45:00Z',
      replies: [
        {
          id: 1,
          sender: 'Admin',
          message: 'Crane is available from next week. Sent details to your email.',
          timestamp: '2024-01-12T17:30:00Z'
        },
        {
          id: 2,
          sender: 'Anjali Mehta',
          message: 'Thanks! Please share the rental agreement.',
          timestamp: '2024-01-12T18:15:00Z'
        }
      ]
    },
    {
      id: 5,
      name: 'Suresh Patel',
      email: 'suresh@patelengineering.com',
      phone: '+91 54321 09876',
      type: 'whatsapp',
      subject: 'Equipment Maintenance',
      message: 'Do you provide maintenance services for existing equipment?',
      status: 'read',
      timestamp: '2024-01-11T11:20:00Z',
      replies: [
        {
          id: 1,
          sender: 'Admin',
          message: 'Yes, we provide maintenance services. Let me connect you with our service team.',
          timestamp: '2024-01-11T12:00:00Z'
        }
      ]
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMessages(mockMessages);
      setFilteredMessages(mockMessages);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = [...messages];
    
    if (filters.type !== 'all') {
      filtered = filtered.filter(msg => msg.type === filters.type);
    }
    
    if (filters.status !== 'all') {
      filtered = filtered.filter(msg => msg.status === filters.status);
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(msg =>
        msg.name.toLowerCase().includes(searchTerm) ||
        msg.email.toLowerCase().includes(searchTerm) ||
        msg.subject.toLowerCase().includes(searchTerm) ||
        msg.message.toLowerCase().includes(searchTerm)
      );
    }
    
    setFilteredMessages(filtered);
  }, [filters, messages]);

  const getTypeIcon = (type) => {
    switch(type) {
      case 'whatsapp': return <FaWhatsapp className="text-green-500" />;
      case 'website': return <FaComment className="text-blue-500" />;
      case 'email': return <FaEnvelope className="text-red-500" />;
      case 'phone': return <FaPhone className="text-purple-500" />;
      default: return <FaComment className="text-gray-500" />;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'whatsapp': return 'bg-green-100 text-green-800';
      case 'website': return 'bg-blue-100 text-blue-800';
      case 'email': return 'bg-red-100 text-red-800';
      case 'phone': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleReply = () => {
    if (!replyText.trim() || !selectedMessage) return;

    const newReply = {
      id: selectedMessage.replies.length + 1,
      sender: 'Admin',
      message: replyText,
      timestamp: new Date().toISOString()
    };

    const updatedMessages = messages.map(msg =>
      msg.id === selectedMessage.id
        ? { ...msg, replies: [...msg.replies, newReply], status: 'read' }
        : msg
    );

    setMessages(updatedMessages);
    setSelectedMessage({ ...selectedMessage, replies: [...selectedMessage.replies, newReply] });
    setReplyText('');
  };

  const markAsRead = (messageId) => {
    const updatedMessages = messages.map(msg =>
      msg.id === messageId ? { ...msg, status: 'read' } : msg
    );
    setMessages(updatedMessages);
    
    if (selectedMessage?.id === messageId) {
      setSelectedMessage({ ...selectedMessage, status: 'read' });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Message Center</h1>
        <p className="text-gray-600">Manage all customer messages and inquiries</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center mb-4">
          <FaFilter className="mr-2 text-gray-400" />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message Type</label>
            <select
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            >
              <option value="all">All Types</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="website">Website</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            >
              <option value="all">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search messages..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Messages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Messages ({filteredMessages.length})</h2>
          </div>
          <div className="overflow-y-auto max-h-[600px]">
            {filteredMessages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => {
                  setSelectedMessage(msg);
                  if (msg.status === 'unread') markAsRead(msg.id);
                }}
                className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                  selectedMessage?.id === msg.id ? 'bg-blue-50' : ''
                } ${msg.status === 'unread' ? 'bg-blue-50' : ''}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    {getTypeIcon(msg.type)}
                    <span className="ml-2 font-semibold">{msg.name}</span>
                    {msg.status === 'unread' && (
                      <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(msg.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <div className="mb-2">
                  <div className="font-medium text-gray-900">{msg.subject}</div>
                  <div className="text-sm text-gray-600 truncate">{msg.message}</div>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(msg.type)}`}>
                    {msg.type}
                  </span>
                  <div className="text-xs text-gray-500">
                    {msg.replies.length} {msg.replies.length === 1 ? 'reply' : 'replies'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          {selectedMessage ? (
            <div className="h-full flex flex-col">
              {/* Message Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedMessage.subject}</h2>
                    <div className="flex items-center mt-2 space-x-4">
                      <div className="flex items-center">
                        {getTypeIcon(selectedMessage.type)}
                        <span className="ml-2 font-medium">{selectedMessage.name}</span>
                      </div>
                      <div className="text-sm text-gray-500">{selectedMessage.email}</div>
                      <div className="text-sm text-gray-500">{selectedMessage.phone}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">
                      {new Date(selectedMessage.timestamp).toLocaleString()}
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(selectedMessage.type)}`}>
                      {selectedMessage.type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                {/* Original Message */}
                <div className="mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-semibold">{selectedMessage.name}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(selectedMessage.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                    <p className="text-gray-700">{selectedMessage.message}</p>
                  </div>
                </div>

                {/* Replies */}
                {selectedMessage.replies.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Replies ({selectedMessage.replies.length})</h3>
                    {selectedMessage.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className={`rounded-lg p-4 ${
                          reply.sender === 'Admin'
                            ? 'bg-blue-50 ml-8'
                            : 'bg-gray-50 mr-8'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-semibold">{reply.sender}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(reply.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                        <p className="text-gray-700">{reply.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Reply Box */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex space-x-3">
                  <div className="flex-1">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply..."
                      rows="3"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                  </div>
                  <div>
                    <button
                      onClick={handleReply}
                      disabled={!replyText.trim()}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaReply className="mr-2" />
                      Reply
                    </button>
                  </div>
                </div>
                <div className="mt-3 flex space-x-3">
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    Reply via WhatsApp
                  </button>
                  <button className="text-sm text-green-600 hover:text-green-800">
                    Reply via Email
                  </button>
                  <button className="text-sm text-purple-600 hover:text-purple-800">
                    Call Back
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-12">
              <div className="text-center">
                <FaComment className="text-4xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No message selected</h3>
                <p className="text-gray-500">Select a message from the list to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;