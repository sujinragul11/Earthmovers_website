import React, { useState, useEffect } from 'react';
import StatsCard from '../componants/ui/StatsCard';
import { 
  FaUsers, 
  FaEye, 
  FaComments, 
  FaTruck, 
  FaChartLine,
  FaWhatsapp,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';
import { contactService } from '../services/contactService';
import { analyticsService } from '../services/analyticsService';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalContacts: 0,
    newLeads: 0,
    totalVisitors: 0,
    conversionRate: 0,
    messages: 0,
    equipment: 0
  });
  const [recentContacts, setRecentContacts] = useState([]);
  const [realTimeVisitors, setRealTimeVisitors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch contacts stats
      const contactsRes = await contactService.getStats();
      const analyticsRes = await analyticsService.getVisitorStats();
      const realTimeRes = await analyticsService.getRealTimeVisitors();
      const contactsListRes = await contactService.getContacts();

      if (contactsRes.success) {
        setStats({
          totalContacts: contactsRes.data.total,
          newLeads: contactsRes.data.newLeads,
          totalVisitors: analyticsRes.data?.totalVisitors || 0,
          conversionRate: contactsRes.data.conversionRate,
          messages: 45, // Mock data
          equipment: 17 // Mock data
        });
      }

      if (contactsListRes.success) {
        setRecentContacts(contactsListRes.data.slice(0, 5));
      }

      if (realTimeRes.success) {
        setRealTimeVisitors(realTimeRes.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
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
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatsCard
          title="Total Contacts"
          value={stats.totalContacts}
          icon={FaUsers}
          change="+12%"
          description="from last week"
        />
        <StatsCard
          title="New Leads"
          value={stats.newLeads}
          icon={FaComments}
          change="+8%"
          description="from yesterday"
        />
        <StatsCard
          title="Website Visitors"
          value={stats.totalVisitors.toLocaleString()}
          icon={FaEye}
          change="+24%"
          description="from last week"
        />
        <StatsCard
          title="Conversion Rate"
          value={`${stats.conversionRate}%`}
          icon={FaChartLine}
          change="+3.2%"
          description="from last month"
        />
        <StatsCard
          title="Total Messages"
          value={stats.messages}
          icon={FaEnvelope}
          change="+15%"
          description="from yesterday"
        />
        <StatsCard
          title="Equipment"
          value={stats.equipment}
          icon={FaTruck}
          change="+2"
          description="new added"
        />
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contacts */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Contacts</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentContacts.map((contact) => (
                  <tr key={contact.id}>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{contact.name}</div>
                      <div className="text-sm text-gray-500">{contact.company}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-900">{contact.phone}</div>
                      <div className="text-sm text-gray-500">{contact.email}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        contact.status === 'new' ? 'bg-green-100 text-green-800' :
                        contact.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                        contact.status === 'quoted' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {contact.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Real-time Visitors */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Visitors</h2>
          <div className="space-y-4">
            {realTimeVisitors.slice(0, 5).map((visitor) => (
              <div key={visitor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{visitor.location}</div>
                  <div className="text-sm text-gray-500">{visitor.page} • {visitor.device}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{visitor.duration}</div>
                  <div className="text-xs text-gray-500">{visitor.browser}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <FaWhatsapp className="text-2xl text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">WhatsApp</span>
            <span className="text-xs text-gray-500">Check messages</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <FaPhone className="text-2xl text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Calls</span>
            <span className="text-xs text-gray-500">Missed calls</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <FaEnvelope className="text-2xl text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Emails</span>
            <span className="text-xs text-gray-500">Unread emails</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
            <FaTruck className="text-2xl text-yellow-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Equipment</span>
            <span className="text-xs text-gray-500">Add new</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;