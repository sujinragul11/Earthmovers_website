import { prisma } from '../config/prisma.js';
import geoip from 'geoip-lite';
import useragent from 'useragent';
import { v4 as uuidv4 } from 'uuid';

// @desc    Track visitor
// @route   POST /api/visitors/track
// @access  Public
export const trackVisitor = async (req, res) => {
  try {
    const { pageUrl, pageTitle, referrer, sessionId } = req.body;
    
    // Get IP and user agent
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const parsedAgent = useragent.parse(userAgent);
    
    // Get location from IP
    const geo = geoip.lookup(ip);
    
    // Generate session ID if not provided
    const visitorSessionId = sessionId || uuidv4();
    
    // Check if visitor exists
    let visitor = await prisma.visitor.findUnique({
      where: { sessionId: visitorSessionId }
    });
    
    if (!visitor) {
      // Create new visitor
      visitor = await prisma.visitor.create({
        data: {
          sessionId: visitorSessionId,
          ipAddress: ip,
          userAgent: userAgent,
          browser: parsedAgent.family,
          os: parsedAgent.os.family,
          device: parsedAgent.device.family,
          location: geo ? `${geo.city}, ${geo.country}` : 'Unknown',
          country: geo?.country,
          city: geo?.city,
          referrer: referrer,
          landingPage: pageUrl,
          currentPage: pageUrl,
          pages: [pageUrl],
          isReturning: false
        }
      });
      
      // Emit new visitor event
      if (req.io) {
        req.io.to('admin-room').emit('new-visitor', visitor);
      }
    } else {
      // Update existing visitor
      const pages = Array.isArray(visitor.pages) ? visitor.pages : [];
      if (!pages.includes(pageUrl)) {
        pages.push(pageUrl);
      }
      
      visitor = await prisma.visitor.update({
        where: { id: visitor.id },
        data: {
          currentPage: pageUrl,
          pages,
          updatedAt: new Date()
        }
      });
    }
    
    // Record page view
    await prisma.pageView.create({
      data: {
        visitorId: visitor.id,
        pageUrl,
        pageTitle
      }
    });
    
    // Update analytics
    await updateAnalytics();
    
    res.status(200).json({
      success: true,
      sessionId: visitor.sessionId,
      visitorId: visitor.id
    });
  } catch (error) {
    console.error('Track visitor error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get visitor statistics
// @route   GET /api/visitors/stats
// @access  Private/Admin
export const getVisitorStats = async (req, res) => {
  try {
    const { period = 'today' } = req.query;
    
    let startDate = new Date();
    
    switch (period) {
      case 'today':
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'week':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'month':
        startDate.setDate(startDate.getDate() - 30);
        break;
      case 'year':
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      default:
        startDate.setDate(startDate.getDate() - 7);
    }
    
    const [
      totalVisitors,
      uniqueVisitors,
      pageViews
    ] = await Promise.all([
      // Total visitors
      prisma.visitor.count({
        where: { createdAt: { gte: startDate } }
      }),
      
      // Unique visitors (simplified - using session count)
      prisma.visitor.count({
        where: { createdAt: { gte: startDate } }
      }),
      
      // Page views
      prisma.pageView.count({
        where: { createdAt: { gte: startDate } }
      })
    ]);
    
    res.status(200).json({
      success: true,
      data: {
        period,
        totalVisitors,
        uniqueVisitors,
        pageViews,
        bounceRate: 0, // Placeholder
        avgDuration: 0, // Placeholder
        topPages: [], // Placeholder
        sources: [], // Placeholder
        locations: [], // Placeholder
        devices: { desktop: 0, mobile: 0, tablet: 0, other: 0 }, // Placeholder
        realTimeVisitors: 0 // Placeholder
      }
    });
  } catch (error) {
    console.error('Get visitor stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get real-time visitors
// @route   GET /api/visitors/realtime
// @access  Private/Admin
export const getRealTimeVisitors = async (req, res) => {
  try {
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
    
    const visitors = await prisma.visitor.findMany({
      where: {
        updatedAt: { gte: fifteenMinutesAgo }
      },
      orderBy: { updatedAt: 'desc' },
      take: 50
    });
    
    res.status(200).json({
      success: true,
      data: visitors
    });
  } catch (error) {
    console.error('Get realtime visitors error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Helper functions
const calculateBounceRate = async (startDate) => {
  const singlePageVisits = await prisma.visitor.count({
    where: {
      createdAt: { gte: startDate },
      pages: { equals: [] }
    }
  });
  
  const totalVisits = await prisma.visitor.count({
    where: { createdAt: { gte: startDate } }
  });
  
  return totalVisits > 0 ? (singlePageVisits / totalVisits) * 100 : 0;
};

const calculateAvgDuration = async (startDate) => {
  const visitors = await prisma.visitor.findMany({
    where: { createdAt: { gte: startDate } },
    select: { duration: true }
  });
  
  const durations = visitors.map(v => v.duration || 0).filter(d => d > 0);
  const avg = durations.length > 0 
    ? durations.reduce((a, b) => a + b, 0) / durations.length 
    : 0;
  
  return Math.round(avg);
};

const getTopPages = async (startDate) => {
  const pageViews = await prisma.pageView.groupBy({
    by: ['pageUrl'],
    where: { createdAt: { gte: startDate } },
    _count: true,
    orderBy: { _count: 'desc' },
    take: 10
  });
  
  return pageViews.map(pv => ({
    page: pv.pageUrl,
    views: pv._count
  }));
};

const getTrafficSources = async (startDate) => {
  const visitors = await prisma.visitor.findMany({
    where: { createdAt: { gte: startDate } },
    select: { referrer: true }
  });
  
  const sources = {
    direct: 0,
    google: 0,
    social: 0,
    referral: 0,
    other: 0
  };
  
  visitors.forEach(v => {
    if (!v.referrer) {
      sources.direct++;
    } else if (v.referrer.includes('google')) {
      sources.google++;
    } else if (v.referrer.includes('facebook') || v.referrer.includes('instagram') || v.referrer.includes('twitter')) {
      sources.social++;
    } else if (v.referrer.includes('earthmovers')) {
      sources.referral++;
    } else {
      sources.other++;
    }
  });
  
  return sources;
};

const getVisitorLocations = async (startDate) => {
  const visitors = await prisma.visitor.findMany({
    where: { createdAt: { gte: startDate } },
    select: { location: true }
  });
  
  const locations = {};
  visitors.forEach(v => {
    if (v.location) {
      locations[v.location] = (locations[v.location] || 0) + 1;
    }
  });
  
  return Object.entries(locations)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([location, count]) => ({ location, count }));
};

const getDeviceStats = async (startDate) => {
  const visitors = await prisma.visitor.findMany({
    where: { createdAt: { gte: startDate } },
    select: { device: true }
  });
  
  const devices = {
    desktop: 0,
    mobile: 0,
    tablet: 0,
    other: 0
  };
  
  visitors.forEach(v => {
    const device = (v.device || '').toLowerCase();
    if (device.includes('mobile')) {
      devices.mobile++;
    } else if (device.includes('tablet')) {
      devices.tablet++;
    } else if (device.includes('desktop') || device.includes('pc') || device.includes('mac')) {
      devices.desktop++;
    } else {
      devices.other++;
    }
  });
  
  return devices;
};

const updateAnalytics = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    await prisma.analytics.upsert({
      where: { date: today },
      update: {
        totalVisitors: { increment: 1 },
        pageViews: { increment: 1 },
        updatedAt: new Date()
      },
      create: {
        date: today,
        totalVisitors: 1,
        uniqueVisitors: 1,
        pageViews: 1,
        bounceRate: 0,
        avgDuration: 0,
        sources: {},
        topPages: {},
        conversions: 0
      }
    });
  } catch (error) {
    console.error('Update analytics error:', error);
  }
};