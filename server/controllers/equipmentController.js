import { prisma } from '../config/prisma.js';

// @desc    Get all equipment
// @route   GET /api/equipment
// @access  Private (Admin, Manager, SuperAdmin)
export const getEquipments = async (req, res) => {
  try {
    const { category, search, isActive, isFeatured } = req.query;

    const where = {};
    if (category) where.category = category;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }
    if (isActive !== undefined) where.isActive = isActive === 'true';
    if (isFeatured !== undefined) where.isFeatured = isFeatured === 'true';

    const equipments = await prisma.equipment.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      count: equipments.length,
      data: equipments
    });
  } catch (error) {
    console.error('Get equipments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single equipment
// @route   GET /api/equipment/:id
// @access  Private (Admin, Manager, SuperAdmin)
export const getEquipment = async (req, res) => {
  try {
    const equipment = await prisma.equipment.findUnique({
      where: { id: req.params.id }
    });

    if (!equipment) {
      return res.status(404).json({
        success: false,
        message: 'Equipment not found'
      });
    }

    res.json({
      success: true,
      data: equipment
    });
  } catch (error) {
    console.error('Get equipment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create new equipment
// @route   POST /api/equipment
// @access  Private (Admin, SuperAdmin)
export const createEquipment = async (req, res) => {
  try {
    const {
      name,
      category,
      units,
      available,
      hourlyRate,
      dailyRate,
      weeklyRate,
      monthlyRate,
      operatorBata,
      minHours,
      fuelPerHour,
      specs,
      features,
      images,
      description,
      isFeatured,
      isActive
    } = req.body;

    // Generate slug from name
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    const equipment = await prisma.equipment.create({
      data: {
        name,
        slug,
        category,
        units: parseInt(units) || 1,
        available: parseInt(available) || 1,
        hourlyRate: parseFloat(hourlyRate),
        dailyRate: dailyRate ? parseFloat(dailyRate) : null,
        weeklyRate: weeklyRate ? parseFloat(weeklyRate) : null,
        monthlyRate: monthlyRate ? parseFloat(monthlyRate) : null,
        operatorBata: operatorBata ? parseFloat(operatorBata) : null,
        minHours: parseInt(minHours) || 4,
        fuelPerHour: fuelPerHour ? parseFloat(fuelPerHour) : null,
        specs: specs || {},
        features: features || [],
        images: images || [],
        description,
        isFeatured: isFeatured || false,
        isActive: isActive !== undefined ? isActive : true
      }
    });

    res.status(201).json({
      success: true,
      data: equipment
    });
  } catch (error) {
    console.error('Create equipment error:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({
        success: false,
        message: 'Equipment with this name already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update equipment
// @route   PUT /api/equipment/:id
// @access  Private (Admin, SuperAdmin)
export const updateEquipment = async (req, res) => {
  try {
    const {
      name,
      category,
      units,
      available,
      hourlyRate,
      dailyRate,
      weeklyRate,
      monthlyRate,
      operatorBata,
      minHours,
      fuelPerHour,
      specs,
      features,
      images,
      description,
      isFeatured,
      isActive
    } = req.body;

    // Generate new slug if name changed
    let slug;
    if (name) {
      slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    }

    const equipment = await prisma.equipment.update({
      where: { id: req.params.id },
      data: {
        ...(name && { name }),
        ...(slug && { slug }),
        ...(category && { category }),
        ...(units !== undefined && { units: parseInt(units) }),
        ...(available !== undefined && { available: parseInt(available) }),
        ...(hourlyRate !== undefined && { hourlyRate: parseFloat(hourlyRate) }),
        ...(dailyRate !== undefined && { dailyRate: dailyRate ? parseFloat(dailyRate) : null }),
        ...(weeklyRate !== undefined && { weeklyRate: weeklyRate ? parseFloat(weeklyRate) : null }),
        ...(monthlyRate !== undefined && { monthlyRate: monthlyRate ? parseFloat(monthlyRate) : null }),
        ...(operatorBata !== undefined && { operatorBata: operatorBata ? parseFloat(operatorBata) : null }),
        ...(minHours !== undefined && { minHours: parseInt(minHours) }),
        ...(fuelPerHour !== undefined && { fuelPerHour: fuelPerHour ? parseFloat(fuelPerHour) : null }),
        ...(specs && { specs }),
        ...(features && { features }),
        ...(images && { images }),
        ...(description !== undefined && { description }),
        ...(isFeatured !== undefined && { isFeatured }),
        ...(isActive !== undefined && { isActive })
      }
    });

    res.json({
      success: true,
      data: equipment
    });
  } catch (error) {
    console.error('Update equipment error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Equipment not found'
      });
    }
    if (error.code === 'P2002') {
      return res.status(400).json({
        success: false,
        message: 'Equipment with this name already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete equipment
// @route   DELETE /api/equipment/:id
// @access  Private (SuperAdmin)
export const deleteEquipment = async (req, res) => {
  try {
    await prisma.equipment.delete({
      where: { id: req.params.id }
    });

    res.json({
      success: true,
      message: 'Equipment deleted successfully'
    });
  } catch (error) {
    console.error('Delete equipment error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Equipment not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get equipment stats
// @route   GET /api/equipment/stats/overview
// @access  Private (Admin, Manager, SuperAdmin)
export const getEquipmentStats = async (req, res) => {
  try {
    const totalEquipment = await prisma.equipment.count();
    const activeEquipment = await prisma.equipment.count({ where: { isActive: true } });
    const featuredEquipment = await prisma.equipment.count({ where: { isFeatured: true } });

    const categoryStats = await prisma.equipment.groupBy({
      by: ['category'],
      _count: { category: true },
      where: { isActive: true }
    });

    res.json({
      success: true,
      data: {
        total: totalEquipment,
        active: activeEquipment,
        featured: featuredEquipment,
        categories: categoryStats
      }
    });
  } catch (error) {
    console.error('Get equipment stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};