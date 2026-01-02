// Mock data for analytics
const generateVisitorData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map(day => ({
    day,
    visitors: Math.floor(Math.random() * 1000) + 500,
    pageViews: Math.floor(Math.random() * 3000) + 1500,
    uniqueVisitors: Math.floor(Math.random() * 800) + 300
  }));
};

const generateSourceData = () => [
  { source: 'Google', visitors: 1560, percentage: 45 },
  { source: 'Direct', visitors: 890, percentage: 25 },
  { source: 'Social Media', visitors: 690, percentage: 20 },
  { source: 'Referral', visitors: 360, percentage: 10 }
];

const generatePageViews = () => [
  { page: '/', views: 12500 },
  { page: '/fleet', views: 8900 },
  { page: '/pricing', views: 7600 },
  { page: '/contact', views: 5400 },
  { page: '/projects', views: 4800 },
  { page: '/about', views: 3200 }
];

export const analyticsService = {
  getVisitorStats: async (period = '7d') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            totalVisitors: 12542,
            totalPageViews: 45210,
            avgVisitDuration: '4m 32s',
            bounceRate: '32%',
            weeklyData: generateVisitorData(),
            sources: generateSourceData(),
            topPages: generatePageViews()
          }
        });
      }, 500);
    });
  },

  getRealTimeVisitors: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const visitors = Array.from({ length: Math.floor(Math.random() * 20) + 5 }, (_, i) => ({
          id: i + 1,
          ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          location: ['Chennai', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Kolkata'][i % 6],
          page: ['/', '/fleet', '/pricing', '/contact'][i % 4],
          duration: `${Math.floor(Math.random() * 10) + 1}m ${Math.floor(Math.random() * 60)}s`,
          device: ['Desktop', 'Mobile', 'Tablet'][i % 3],
          browser: ['Chrome', 'Firefox', 'Safari', 'Edge'][i % 4]
        }));
        
        resolve({
          success: true,
          data: visitors,
          total: visitors.length
        });
      }, 300);
    });
  },

  getConversionMetrics: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            contactFormSubmissions: 245,
            whatsappClicks: 189,
            phoneCalls: 156,
            quoteRequests: 98,
            conversionRate: '12.5%',
            avgResponseTime: '15m 30s'
          }
        });
      }, 300);
    });
  }
};