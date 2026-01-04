# EmailJS Setup Guide

To make the contact form work, you need to set up EmailJS (a free service that sends emails from your website).

## Steps:

1. **Sign up for EmailJS** (free account):
   - Go to https://www.emailjs.com/
   - Sign up for a free account

2. **Create an Email Service**:
   - Go to "Email Services" in your dashboard
   - Click "Add New Service"
   - Choose "Gmail" (or your preferred email provider)
   - Connect your email account (mihir.konda@gmail.com)
   - Copy the **Service ID**

3. **Create an Email Template**:
   - Go to "Email Templates" in your dashboard
   - Click "Create New Template"
   - Set the "To Email" to: `mihir.konda@gmail.com`
   - Set the "Subject" to something like: `Portfolio Contact Form: {{name}}`
   - In the message body, use:
     ```
     From: {{name}}
     Email: {{email}}
     
     Message:
     {{message}}
     ```
   - Save the template and copy the **Template ID**

4. **Get your Public Key**:
   - Go to "Account" → "General"
   - Copy your **Public Key**

5. **Create a `.env` file** in the root of your project:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id_here
   VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
   VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
   ```
   Replace the placeholder values with your actual IDs and key.

6. **Restart your development server**:
   - Stop the server (Ctrl+C)
   - Run `npm run dev` again

That's it! The contact form should now send emails to mihir.konda@gmail.com.

