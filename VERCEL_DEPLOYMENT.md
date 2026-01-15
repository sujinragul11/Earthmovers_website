# Vercel Deployment Configuration

This file contains the Vercel deployment settings for the EarthMovers Rental application.

## Environment Variables

Make sure to set these environment variables in your Vercel project settings:

- `DATABASE_URL` - PostgreSQL database connection string
- `JWT_SECRET` - Secret key for JWT token signing
- `TWILIO_ACCOUNT_SID` - Twilio account SID
- `TWILIO_AUTH_TOKEN` - Twilio authentication token
- `TWILIO_PHONE_NUMBER` - Twilio phone number for SMS
- `SMTP_HOST` - SMTP server host for email
- `SMTP_PORT` - SMTP server port
- `SMTP_USER` - SMTP username
- `SMTP_PASS` - SMTP password
- `NODE_ENV` - Set to "production" for Vercel deployment

## Build and Deployment

The application uses:
- **Build Command**: `npm run build` - Builds the Vite project
- **Output Directory**: `dist` - Contains the built frontend
- **Install Command**: `npm ci` - Clean npm installation
- **Dev Command**: `npm run dev` - For local development

## Troubleshooting

If you encounter any issues during deployment:

1. Check that all environment variables are properly set
2. Verify that the build command completes without errors
3. Ensure all npm dependencies are compatible
4. Check the Vercel logs for detailed error messages
