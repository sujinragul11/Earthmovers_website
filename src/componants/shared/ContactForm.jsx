import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '../../schemas/contactSchema';
import { generateWhatsAppMessage } from '../../utils/whatsapp';
import Button from '../ui/Button';

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data) => {
    const whatsappUrl = generateWhatsAppMessage(data);
    window.open(whatsappUrl, '_blank');
    reset();
  };

  const services = [
    'Excavator Rental',
    'Loader Rental',
    'Dumper Rental',
    'Crane Rental',
    'Operator Service',
    'Project Consultation',
    'Equipment Purchase',
    'Maintenance Service',
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="label">
            Full Name *
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className="input-field"
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="label">
            Phone Number *
          </label>
          <input
            id="phone"
            type="tel"
            {...register('phone')}
            className="input-field"
            placeholder="Enter 10-digit mobile number"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="label">
          Email Address *
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="input-field"
          placeholder="Enter your email address"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Service */}
      <div>
        <label htmlFor="service" className="label">
          Service Needed *
        </label>
        <select
          id="service"
          {...register('service')}
          className="input-field"
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
        {errors.service && (
          <p className="mt-1 text-sm text-red-600">{errors.service.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="label">
          Message (Optional)
        </label>
        <textarea
          id="message"
          rows={4}
          {...register('message')}
          className="input-field"
          placeholder="Tell us about your project requirements..."
        />
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          * Required fields
        </p>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center space-x-2"
        >
          <span>Send via WhatsApp</span>
          {isSubmitting && (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
        </Button>
      </div>

      {/* Privacy Note */}
      <p className="text-xs text-gray-500 text-center">
        By submitting this form, you agree to our privacy policy and consent to being contacted via WhatsApp.
      </p>
    </form>
  );
};

export default ContactForm;