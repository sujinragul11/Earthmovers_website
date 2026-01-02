import React, { useState, useEffect } from 'react';
import { FaUsers, FaEye, FaMapMarkerAlt, FaDesktop, FaMobileAlt, FaTabletAlt } from 'react-icons/fa';
import { analyticsService } from '../services/analyticsService';

const Visitors = () => {
  const [visitorStats, setVisitorStats] = useState(null);
  const [realTimeVisitors, setRealTimeVisitors] = useState([]);
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVisitorData();
  }, [timeRange]);

  const fetchVisitorData = async () => {
    setLoading(true);
    try {
      const statsRes = await analyticsService.getVisitorStats(timeRange);
      const realTimeRes = await analyticsService.getRealTimeVisitors();
      
      if (statsRes.success) {
        setVisitorStats(statsRes.data);
      }
      
      if (realTimeRes.success) {
        setRealTimeVisitors(realTimeRes.data);
      }
    } catch (error) {
      console.error('Error fetching visitor data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDeviceIcon = (device) => {
    switch(device.toLowerCase()) {
      case 'desktop': return <FaDesktop className="text-blue-500" />;
      case 'mobile': return <FaMobileAlt className="text-green-500" />;
      case 'tablet': return <FaTabletAlt className="text-purple-500" />;
      default: return <FaDesktop className="text-gray-500" />;
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
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Visitor Analytics</h1>
          <p className="text-gray-600">Track and analyze website traffic</p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100">
              <FaUsers className="text-blue-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Visitors</p>
              <p className="text-2xl font-semibold text-gray-900">
                {visitorStats?.totalVisitors.toLocaleString() || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100">
              <FaEye className="text-green-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Page Views</p>
              <p className="text-2xl font-semibold text-gray-900">
                {visitorStats?.totalPageViews.toLocaleString() || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-100">
              <FaMapMarkerAlt className="text-yellow-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg. Duration</p>
              <p className="text-2xl font-semibold text-gray-900">
                {visitorStats?.avgVisitDuration || '0m 0s'}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-red-100">
              <FaUsers className="text-red-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Bounce Rate</p>
              <p className="text-2xl font-semibold text-gray-900">
                {visitorStats?.bounceRate || '0%'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic Sources */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Traffic Sources</h2>
          <div className="space-y-4">
            {visitorStats?.sources?.map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-3"></div>
                  <span className="font-medium">{source.source}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-900 font-semibold">{source.visitors.toLocaleString()}</span>
                  <span className="text-gray-500">({source.percentage}%)</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Pages</h2>
          <div className="space-y-3">
            {visitorStats?.topPages?.map((page, index) => (
              <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                <div className="flex items-center">
                  <span className="text-gray-400 mr-2">#{index + 1}</span>
                  <span className="font-medium">{page.page}</span>
                </div>
                <span className="text-gray-900 font-semibold">{page.views.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Visitors */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Active Visitors ({realTimeVisitors.length})</h2>
          <p className="text-sm text-gray-600">Users currently browsing the website</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Page</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Browser</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {realTimeVisitors.map((visitor) => (
                <tr key={visitor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="text-gray-400 mr-2" />
                      <span className="font-medium">{visitor.location}</span>
                    </div>
                    <div className="text-sm text-gray-500">{visitor.ip}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{visitor.page}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getDeviceIcon(visitor.device)}
                      <span className="ml-2">{visitor.device}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                      {visitor.browser}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {visitor.duration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Visitors;