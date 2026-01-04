import { prisma } from '../config/prisma.js';

// @desc    Get conversion metrics
// @route   GET /api/analytics/conversion
// @access  Private (Admin, Manager, SuperAdmin)
export const getConversionMetrics = async (req, res) => {
  try {
    // Get total contacts
    const totalContacts = await prisma.contact.count();

    // Get contacts by status
    const statusStats = await prisma.contact.groupBy({
      by: ['status'],
      _count: true
    });

    // Calculate conversion rates
    const newContacts = statusStats.find(s => s.status === 'NEW')?._count || 0;
    const contactedContacts = statusStats.find(s => s.status === 'CONTACTED')?._count || 0;
    const convertedContacts = statusStats.find(s => s.status === 'CONVERTED')?._count || 0;

    // Get conversion funnel data
    const conversionFunnel = [
      { stage: 'New Leads', count: newContacts, percentage: totalContacts > 0 ? (newContacts / totalContacts) * 100 : 0 },
      { stage: 'Contacted', count: contactedContacts, percentage: totalContacts > 0 ? (contactedContacts / totalContacts) * 100 : 0 },
      { stage: 'Converted', count: convertedContacts, percentage: totalContacts > 0 ? (convertedContacts / totalContacts) * 100 : 0 }
    ];

    // Get conversion trends (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const conversionTrends = await prisma.contact.groupBy({
      by: ['status'],
      where: {
        createdAt: {
          gte: thirtyDaysAgo
        }
      },
      _count: true
    });

    // Calculate metrics
    const conversionRate = totalContacts > 0 ? (convertedContacts / totalContacts) * 100 : 0;
    const contactRate = totalContacts > 0 ? (contactedContacts / totalContacts) * 100 : 0;

    res.status(200).json({
      success: true,
      data: {
        totalContacts,
        conversionRate: Math.round(conversionRate * 100) / 100,
        contactRate: Math.round(contactRate * 100) / 100,
        conversionFunnel,
        statusBreakdown: statusStats,
        trends: conversionTrends
      }
    });
  } catch (error) {
    console.error('Get conversion metrics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};