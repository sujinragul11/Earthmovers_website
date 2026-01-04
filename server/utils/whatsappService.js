import twilio from 'twilio';

let twilioClient;

if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
}

export const sendWhatsAppMessage = async ({ to, message }) => {
  try {
    if (!twilioClient) {
      console.log('Twilio not configured');
      return false;
    }

    const result = await twilioClient.messages.create({
      body: message,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${to}`
    });

    console.log('WhatsApp message sent:', result.sid);
    return true;
  } catch (error) {
    console.error('WhatsApp send error:', error);
    return false;
  }
};

export const sendContactWhatsApp = async (contact) => {
  const message = `*New Contact Form Submission*\n\n*Name:* ${contact.name}\n*Phone:* ${contact.phone}\n*Email:* ${contact.email}\n*Subject:* ${contact.subject}\n*Message:* ${contact.message || 'N/A'}\n*Time:* ${new Date(contact.createdAt).toLocaleString()}\n\nPlease check admin dashboard for details.`;

  return sendWhatsAppMessage({
    to: process.env.COMPANY_WHATSAPP_NUMBER,
    message
  });
};

export const generateWhatsAppLink = (phone, message) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
};