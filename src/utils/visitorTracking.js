import { visitorService } from '../admin/services/visitorService.js';

// Track visitor on page load
export const trackVisitor = async () => {
  // Check if already tracked in this session
  const sessionId = sessionStorage.getItem('visitor_session_id');
  if (sessionId) {
    return; // Already tracked
  }

  try {
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('visitor_session_id', newSessionId);

    const visitData = {
      sessionId: newSessionId,
      pageUrl: window.location.pathname,
      pageTitle: document.title,
      referrer: document.referrer
    };

    await visitorService.trackVisit(visitData);
  } catch (error) {
    console.error('Error tracking visitor:', error);
  }
};

// Helper functions
function getBrowserInfo() {
  const ua = navigator.userAgent;
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Safari')) return 'Safari';
  if (ua.includes('Edge')) return 'Edge';
  return 'Unknown';
}

function getOSInfo() {
  const ua = navigator.userAgent;
  if (ua.includes('Windows')) return 'Windows';
  if (ua.includes('Mac')) return 'macOS';
  if (ua.includes('Linux')) return 'Linux';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('iOS')) return 'iOS';
  return 'Unknown';
}

function getDeviceInfo() {
  const ua = navigator.userAgent;
  if (ua.includes('Mobile')) return 'Mobile';
  if (ua.includes('Tablet')) return 'Tablet';
  return 'Desktop';
}

function isReturningVisitor() {
  const lastVisit = localStorage.getItem('last_visit');
  const now = Date.now();
  if (lastVisit) {
    const daysSinceLastVisit = (now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24);
    return daysSinceLastVisit > 1; // Returning if more than 1 day
  }
  localStorage.setItem('last_visit', now.toString());
  return false;
}

// Track page views
export const trackPageView = (page) => {
  const sessionId = sessionStorage.getItem('visitor_session_id');
  if (!sessionId) return;

  // Update current page in session
  sessionStorage.setItem('current_page', page);

  // Could send page view update to server if needed
};