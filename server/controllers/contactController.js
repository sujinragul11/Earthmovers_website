import { prisma } from '../config/prisma.js';
import { sendEmail } from '../utils/emailService.js';
import { sendWhatsAppMessage } from '../utils/whatsappService.js';
import geoip from 'geoip-lite';
import useragent from 'useragent';

// @desc    Create new contact
// @route   POST /api/contacts
// @access  Public
export const createContact = async (req, res) => {
  try {
    const { name, email, phone, company, subject, message } = req.body;

    // Get IP and user agent
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const parsedAgent = useragent.parse(userAgent);
    
    // Get location from IP
    const geo = geoip.lookup(ip);
    const location = geo ? `${geo.city}, ${geo.country}` : 'Unknown';

    // Create contact
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone,
        company,
        subject,
        message,
        source: 'WEBSITE',
        status: 'NEW',
        ipAddress: ip,
        userAgent: userAgent,
        location,
        metadata: {
          browser: parsedAgent.family,
          os: parsedAgent.os.family,
          device: parsedAgent.device.family,
          referrer: req.headers.referer
        }
      }
    });

    // Send email notification to admin
    const adminEmail = process.env.ADMIN_EMAIL;
    await sendEmail({
      to: adminEmail,
      subject: 'New Contact Form Submission - Earthmovers Rental',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message || 'N/A'}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        <br>
        <p>Login to admin dashboard to view details.</p>
      `
    });

    // Send WhatsApp notification if enabled
    if (process.env.TWILIO_ACCOUNT_SID) {
      await sendWhatsAppMessage({
        to: process.env.COMPANY_WHATSAPP_NUMBER,
        message: `*New Contact Form Submission*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${email}\n*Subject:* ${subject}\n\nPlease check admin dashboard for details.`
      });
    }

    // Emit socket event for real-time update
    if (req.io) {
      req.io.to('admin-room').emit('new-contact', contact);
    }

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: contact
    });
  } catch (error) {
    console.error('Create contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get all contacts (for admin)
// @route   GET /api/contacts
// @access  Private/Admin
export const getContacts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      source,
      search,
      startDate,
      endDate,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Build filter
    const filter = {};
    
    if (status) filter.status = status;
    if (source) filter.source = source;
    
    if (search) {
      filter.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
        { subject: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.gte = new Date(startDate);
      if (endDate) filter.createdAt.lte = new Date(endDate);
    }

    // Get total count
    const total = await prisma.contact.count({ where: filter });

    // Get contacts
    const contacts = await prisma.contact.findMany({
      where: filter,
      skip,
      take: parseInt(limit),
      orderBy: { [sortBy]: sortOrder },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        assignedUser: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    // Get stats
    const stats = await prisma.contact.groupBy({
      by: ['status'],
      _count: true
    });

    res.status(200).json({
      success: true,
      data: contacts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      },
      stats
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single contact
// @route   GET /api/contacts/:id
// @access  Private/Admin
export const getContact = async (req, res) => {
  try {
    const contact = await prisma.contact.findUnique({
      where: { id: req.params.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        assignedUser: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update contact status
// @route   PUT /api/contacts/:id/status
// @access  Private/Admin
export const updateContactStatus = async (req, res) => {
  try {
    const { status, notes, assignedTo } = req.body;

    const contact = await prisma.contact.update({
      where: { id: req.params.id },
      data: {
        status,
        notes,
        assignedTo
      },
      include: {
        assignedUser: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.status(200).json({
      success: true,
      message: 'Contact status updated',
      data: contact
    });
  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete contact
// @route   DELETE /api/contacts/:id
// @access  Private/Admin
export const deleteContact = async (req, res) => {
  try {
    await prisma.contact.delete({
      where: { id: req.params.id }
    });

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get contact statistics
// @route   GET /api/contacts/stats/overview
// @access  Private/Admin
export const getContactStats = async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const startOfWeek = new Date(today.setDate(today.getDate() - 7));
    const startOfMonth = new Date(today.setDate(today.getDate() - 30));

    const [
      totalContacts,
      todayContacts,
      weekContacts,
      monthContacts,
      statusStats,
      sourceStats,
      recentContacts
    ] = await Promise.all([
      prisma.contact.count(),
      prisma.contact.count({
        where: { createdAt: { gte: startOfDay } }
      }),
      prisma.contact.count({
        where: { createdAt: { gte: startOfWeek } }
      }),
      prisma.contact.count({
        where: { createdAt: { gte: startOfMonth } }
      }),
      prisma.contact.groupBy({
        by: ['status'],
        _count: true
      }),
      prisma.contact.groupBy({
        by: ['source'],
        _count: true
      }),
      prisma.contact.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          status: true,
          createdAt: true
        }
      })
    ]);

    res.status(200).json({
      success: true,
      data: {
        total: totalContacts,
        today: todayContacts,
        week: weekContacts,
        month: monthContacts,
        statusStats,
        sourceStats,
        recentContacts
      }
    });
  } catch (error) {
    console.error('Get contact stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};