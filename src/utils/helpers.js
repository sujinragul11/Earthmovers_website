export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(amount);
};

export const calculateRentalCost = (hourlyRate, hours, operatorBata = 0) => {
  const baseCost = hourlyRate * Math.max(hours, 4);
  const operatorCost = (operatorBata / 8) * hours;
  return baseCost + operatorCost;
};

export const validatePhone = (phone) => {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(phone);
};

export const getEquipmentCountByCategory = (fleetData) => {
  return fleetData.reduce((acc, equipment) => {
    acc[equipment.category] = (acc[equipment.category] || 0) + equipment.units;
    return acc;
  }, {});
};

export const filterEquipmentByCategory = (fleetData, category) => {
  if (category === 'all') return fleetData;
  return fleetData.filter(equipment => 
    equipment.category.toLowerCase() === category.toLowerCase()
  );
};