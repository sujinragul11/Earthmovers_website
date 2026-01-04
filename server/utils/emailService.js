import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const mailOptions = {
      from: `"Earthmovers Rental" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      text
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
};

export const sendContactConfirmation = async (contact) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1E40AF;">Thank You for Contacting Earthmovers Rental!</h2>
      <p>Dear ${contact.name},</p>
      <p>We have received your inquiry regarding "${contact.subject}". Our team will get back to you within 24 hours.</p>
      
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Your Inquiry Details:</h3>
        <p><strong>Reference ID:</strong> ${contact.id}</p>
        <p><strong>Name:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Phone:</strong> ${contact.phone}</p>
        <p><strong>Subject:</strong> ${contact.subject}</p>
        <p><strong>Submitted:</strong> ${new Date(contact.createdAt).toLocaleString()}</p>
      </div>
      
      <p>For urgent inquiries, please call us at: <strong>${process.env.ADMIN_PHONE}</strong></p>
      
      <p>Best regards,<br>
      Earthmovers Rental Team</p>
      
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
      
      <p style="color: #6b7280; font-size: 12px;">
        This is an automated message. Please do not reply to this email.
      </p>
    </div>
  `;

  return sendEmail({
    to: contact.email,
    subject: 'Thank You for Contacting Earthmovers Rental',
    html
  });
};

export const sendAdminNotification = async (contact) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #dc2626;">New Contact Form Submission</h2>
      
      <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Contact Details:</h3>
        <p><strong>ID:</strong> ${contact.id}</p>
        <p><strong>Name:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Phone:</strong> ${contact.phone}</p>
        <p><strong>Company:</strong> ${contact.company || 'N/A'}</p>
        <p><strong>Subject:</strong> ${contact.subject}</p>
        <p><strong>Message:</strong> ${contact.message || 'N/A'}</p>
        <p><strong>Location:</strong> ${contact.location || 'Unknown'}</p>
        <p><strong>Time:</strong> ${new Date(contact.createdAt).toLocaleString()}</p>
      </div>
      
      <p><a href="${process.env.ADMIN_URL}/contacts/${contact.id}" style="background-color: #1E40AF; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
        View in Admin Dashboard
      </a></p>
    </div>
  `;

  return sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: `New Contact: ${contact.subject}`,
    html
  });
};