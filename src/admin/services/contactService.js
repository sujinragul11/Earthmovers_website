// Mock data for contacts
const mockContacts = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    email: 'rajesh@construction.com',
    phone: '+91 98765 43210',
    company: 'RK Constructions',
    subject: 'Excavator Rental Inquiry',
    message: 'Need 2 JCB excavators for 30 days for road construction project.',
    status: 'new',
    source: 'website',
    createdAt: '2024-01-15T10:30:00Z',
    assignedTo: null
  },
  {
    id: 2,
    name: 'Priya Sharma',
    email: 'priya@sharmabuilders.com',
    phone: '+91 87654 32109',
    company: 'Sharma Builders',
    subject: 'Loader and Tipper Rental',
    message: 'Looking for 3 loaders and 5 tippers for 6 months for township project.',
    status: 'contacted',
    source: 'whatsapp',
    createdAt: '2024-01-14T14:20:00Z',
    assignedTo: 'Manager'
  },
  {
    id: 3,
    name: 'Vikram Singh',
    email: 'vikram@singhinfra.com',
    phone: '+91 76543 21098',
    company: 'Singh Infrastructure',
    subject: 'Monthly Rental Contract',
    message: 'Interested in long-term contract for multiple equipment. Please share rates.',
    status: 'quoted',
    source: 'phone',
    createdAt: '2024-01-13T09:15:00Z',
    assignedTo: 'Super Admin'
  },
  {
    id: 4,
    name: 'Anjali Mehta',
    email: 'anjali@mehtaprojects.com',
    phone: '+91 65432 10987',
    company: 'Mehta Projects',
    subject: 'Crane Rental Inquiry',
    message: 'Need 50-ton crane for bridge construction project for 45 days.',
    status: 'converted',
    source: 'website',
    createdAt: '2024-01-12T16:45:00Z',
    assignedTo: 'Manager'
  },
  {
    id: 5,
    name: 'Suresh Patel',
    email: 'suresh@patelengineering.com',
    phone: '+91 54321 09876',
    company: 'Patel Engineering',
    subject: 'Equipment Maintenance',
    message: 'Looking for maintenance contract for our existing equipment fleet.',
    status: 'new',
    source: 'email',
    createdAt: '2024-01-11T11:20:00Z',
    assignedTo: null
  }
];

export const contactService = {
  getContacts: async (filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredContacts = [...mockContacts];
        
        if (filters.status) {
          filteredContacts = filteredContacts.filter(contact => contact.status === filters.status);
        }
        
        if (filters.search) {
          const searchTerm = filters.search.toLowerCase();
          filteredContacts = filteredContacts.filter(contact =>
            contact.name.toLowerCase().includes(searchTerm) ||
            contact.email.toLowerCase().includes(searchTerm) ||
            contact.company.toLowerCase().includes(searchTerm) ||
            contact.subject.toLowerCase().includes(searchTerm)
          );
        }
        
        resolve({
          success: true,
          data: filteredContacts,
          total: filteredContacts.length
        });
      }, 500);
    });
  },

  getContactById: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const contact = mockContacts.find(c => c.id === id);
        resolve({
          success: !!contact,
          data: contact || null
        });
      }, 300);
    });
  },

  updateContactStatus: async (id, status, notes) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const contactIndex = mockContacts.findIndex(c => c.id === id);
        if (contactIndex !== -1) {
          mockContacts[contactIndex].status = status;
          mockContacts[contactIndex].updatedAt = new Date().toISOString();
          if (notes) {
            mockContacts[contactIndex].notes = notes;
          }
        }
        resolve({
          success: true,
          message: 'Contact status updated successfully'
        });
      }, 300);
    });
  },

  assignContact: async (id, assignedTo) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const contactIndex = mockContacts.findIndex(c => c.id === id);
        if (contactIndex !== -1) {
          mockContacts[contactIndex].assignedTo = assignedTo;
          mockContacts[contactIndex].updatedAt = new Date().toISOString();
        }
        resolve({
          success: true,
          message: 'Contact assigned successfully'
        });
      }, 300);
    });
  },

  deleteContact: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const contactIndex = mockContacts.findIndex(c => c.id === id);
        if (contactIndex !== -1) {
          mockContacts.splice(contactIndex, 1);
        }
        resolve({
          success: true,
          message: 'Contact deleted successfully'
        });
      }, 300);
    });
  },

  getStats: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const total = mockContacts.length;
        const newLeads = mockContacts.filter(c => c.status === 'new').length;
        const contacted = mockContacts.filter(c => c.status === 'contacted').length;
        const converted = mockContacts.filter(c => c.status === 'converted').length;
        
        resolve({
          success: true,
          data: {
            total,
            newLeads,
            contacted,
            converted,
            conversionRate: total > 0 ? Math.round((converted / total) * 100) : 0
          }
        });
      }, 300);
    });
  }
};