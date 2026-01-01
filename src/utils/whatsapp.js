export const generateWhatsAppMessage = (formData) => {
  const phone = "919876543210";
  const message = `
*New Enquiry from Website*

*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Email:* ${formData.email}
*Service Needed:* ${formData.service}
${formData.message ? `*Message:* ${formData.message}` : ''}

_This message was sent from the EarthMovers Rental website_
  `.trim();

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

export const generateQuickQuoteMessage = (equipment, hours) => {
  const phone = "919876543210";
  const message = `
*Quick Quote Request*

I'm interested in renting *${equipment}*
for approximately *${hours} hours*.

Please share the detailed quotation and availability.

Best regards,
[Your Name]
  `.trim();

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};