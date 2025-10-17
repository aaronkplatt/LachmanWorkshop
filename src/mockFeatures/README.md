# Mock Features 📦

This folder contains optional features that are not enabled by default. To use these features, follow the instructions below.

## Newsletter Component

The Newsletter component provides email subscription functionality with Mailchimp integration and reCAPTCHA protection.

### To Enable Newsletter:

1. **Uncomment the import in `src/app/page.tsx`:**
   ```tsx
   import Newsletter from '../mockFeatures/Newsletter';
   ```

2. **Uncomment the component in the JSX:**
   ```tsx
   <Newsletter />
   ```

3. **Uncomment reCAPTCHA script in `src/app/layout.tsx`:**
   ```tsx
   <Script src="https://www.google.com/recaptcha/api.js" strategy="beforeInteractive" />
   ```

4. **Set up environment variables in your `.env` file:**
   ```env
   # Enable newsletter functionality
   NEXT_PUBLIC_ENABLE_NEWSLETTER=true
   
   # Mailchimp Configuration
   MAILCHIMP_API_KEY=your_mailchimp_api_key_here
   MAILCHIMP_LIST_ID=your_mailchimp_list_id_here
   MAILCHIMP_SERVER_PREFIX=us1
   
   # reCAPTCHA Configuration
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
   RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key_here
   ```

5. **Deploy Firebase Functions with environment variables:**
   ```bash
   firebase deploy --only functions
   ```

### Setup Instructions:

#### Mailchimp Setup:
1. Go to [Mailchimp](https://mailchimp.com/) and create an account
2. Go to **Account** → **Extras** → **API Keys**
3. Create a new API key
4. Go to **Audience** → **Settings** → **Audience name and defaults**
5. Copy the **Audience ID** (this is your List ID)
6. Check your API URL to get the server prefix (e.g., "us1" from `https://us1.api.mailchimp.com`)

#### reCAPTCHA Setup:
1. Go to [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
2. Click "+" to create a new site
3. Choose "reCAPTCHA v2" → "I'm not a robot" Checkbox
4. Add your domains:
   - `localhost` (for development)
   - `your-project.web.app` (Firebase hosting)
   - Your custom domain (if you have one)
5. Copy the **Site Key** and **Secret Key**

### Features:
- ✅ Email subscription with Mailchimp integration
- ✅ reCAPTCHA bot protection
- ✅ Rate limiting (3 requests per 15 minutes per IP)
- ✅ Domain restrictions for security
- ✅ Backup storage in Firestore
- ✅ Responsive design with Bootstrap
- ✅ Loading states and error handling
- ✅ Success confirmation with thank you message

### Security Features:
- Rate limiting to prevent spam
- Domain restrictions to prevent unauthorized usage
- reCAPTCHA verification
- Input validation
- Error logging for debugging

The newsletter functionality is fully production-ready and includes comprehensive error handling and security measures.
