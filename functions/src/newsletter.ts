/**
 * Newsletter functionality - COMMENTED OUT
 * Uncomment and enable this if you want to use newsletter features
 */

/*
import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { defineString } from "firebase-functions/params";
import { initializeApp, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase Admin if not already initialized
if (getApps().length === 0) {
  initializeApp();
}

const db = getFirestore();

// Rate limiting configuration
const RATE_LIMIT_REQUESTS = 3; // Max requests per time window (reduced from 10)
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes in milliseconds

// Rate limiting function
async function checkRateLimit(ip: string): Promise<boolean> {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;

  try {
    const rateLimitRef = db.collection('rateLimits').doc(ip);
    const doc = await rateLimitRef.get();

    if (!doc.exists) {
      // First request from this IP
      await rateLimitRef.set({
        requests: [now],
        lastRequest: now
      });
      return true;
    }

    const data = doc.data();
    if (!data) {
      await rateLimitRef.set({
        requests: [now],
        lastRequest: now
      });
      return true;
    }

    const requests = data.requests || [];
    const validRequests = requests.filter((timestamp: number) => timestamp > windowStart);

    if (validRequests.length >= RATE_LIMIT_REQUESTS) {
      logger.warn('Rate limit exceeded', { ip, requests: validRequests.length });
      return false;
    }

    // Add current request
    validRequests.push(now);
    await rateLimitRef.set({
      requests: validRequests,
      lastRequest: now
    });

    return true;
  } catch (error) {
    logger.error('Rate limit check failed', { error, ip });
    // If rate limiting fails, allow the request (fail open)
    return true;
  }
}

// Define the config parameters
const mailchimpApiKey = defineString("MAILCHIMP_API_KEY");
const mailchimpListId = defineString("MAILCHIMP_LIST_ID");
const mailchimpServerPrefix = defineString("MAILCHIMP_SERVER_PREFIX");
const recaptchaSecretKey = defineString("RECAPTCHA_SECRET_KEY");

export const newsletter = onRequest(async (request, response) => {
  // Enable CORS
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.set('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    response.status(204).send('');
    return;
  }

  // Only allow POST requests
  if (request.method !== 'POST') {
    response.status(405).json({ message: 'Method not allowed' });
    return;
  }

  // Get client IP for rate limiting
  const clientIP = request.ip || request.connection.remoteAddress || 'unknown';
  logger.info('Newsletter request received', { ip: clientIP });

  // Check domain restrictions
  const allowedDomains = [
    process.env.NEXT_PUBLIC_SITE_URL?.replace('https://', '').replace('http://', '') || '',
    `${process.env.FIREBASE_PROJECT_ID || 'your-project'}.web.app`,  // Firebase hosting domain
    'localhost:3000'        // For local development
  ].filter(domain => domain); // Remove empty strings

  const referer = request.headers.referer || request.headers.origin;
  const isAllowedDomain = allowedDomains.some(domain =>
    referer?.includes(domain) || referer?.includes('localhost')
  );

  if (!isAllowedDomain) {
    logger.warn('Unauthorized domain access attempt', {
      referer,
      ip: clientIP,
      allowedDomains
    });
    response.status(403).json({
      message: 'Unauthorized domain. Please submit from the official website.'
    });
    return;
  }

  // Check rate limit
  const isAllowed = await checkRateLimit(clientIP);
  if (!isAllowed) {
    response.status(429).json({
      message: 'Too many requests. Please try again later.',
      retryAfter: Math.ceil(RATE_LIMIT_WINDOW / 1000)
    });
    return;
  }

  try {
    const { email, recaptchaToken } = request.body;

    if (!email) {
      response.status(400).json({ message: 'Email is required' });
      return;
    }

    if (!recaptchaToken) {
      response.status(400).json({ message: 'reCAPTCHA verification required' });
      return;
    }

    // Verify reCAPTCHA token
    const recaptchaSecret = recaptchaSecretKey.value();
    if (!recaptchaSecret) {
      logger.error('Missing reCAPTCHA secret key');
      response.status(500).json({ message: 'Server configuration error' });
      return;
    }

    // Dynamic import for fetch
    const { default: fetch } = await import('node-fetch');

    // Verify reCAPTCHA with Google
    const recaptchaVerification = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${recaptchaSecret}&response=${recaptchaToken}`,
    });

    const recaptchaResult = await recaptchaVerification.json() as { success: boolean; 'error-codes'?: string[] };

    if (!recaptchaResult.success) {
      logger.error('reCAPTCHA verification failed', { recaptchaResult });
      response.status(400).json({ message: 'reCAPTCHA verification failed. Please try again.' });
      return;
    }

    // Mailchimp config from environment variables
    const API_KEY = mailchimpApiKey.value();
    const LIST_ID = mailchimpListId.value();
    const SERVER_PREFIX = mailchimpServerPrefix.value();

    if (!API_KEY || !LIST_ID || !SERVER_PREFIX) {
      logger.error('Missing Mailchimp environment variables - newsletter functionality disabled');
      response.status(503).json({ message: 'Newsletter functionality is not configured. Please contact the administrator.' });
      return;
    }

    const url = `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`;
    logger.info('Subscribing email to Mailchimp', { email, url, ip: clientIP });

    const data = {
      email_address: email,
      status: 'subscribed',
    };

    const mailchimpResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `apikey ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (mailchimpResponse.status === 200 || mailchimpResponse.status === 201) {
      // Store email in Firestore as backup
      try {
        const subscriberRef = db.collection('newsletter_subscribers').doc(email.toLowerCase());
        await subscriberRef.set({
          email: email.toLowerCase(),
          subscribedAt: new Date(),
          mailchimpStatus: 'subscribed',
          ipAddress: clientIP,
          lastUpdated: new Date()
        });
        logger.info('Email stored in Firestore', { email, ip: clientIP });
      } catch (firestoreError) {
        logger.error('Failed to store email in Firestore', { email, error: firestoreError, ip: clientIP });
        // Don't fail the request if Firestore storage fails
      }

      logger.info('Successfully subscribed email', { email, ip: clientIP });
      response.json({ message: 'Thank you for subscribing!' });
    } else {
      const error = await mailchimpResponse.json();
      logger.error('Mailchimp subscription failed', { email, error, ip: clientIP });

      // Store failed attempt in Firestore for debugging
      try {
        const subscriberRef = db.collection('newsletter_subscribers').doc(email.toLowerCase());
        await subscriberRef.set({
          email: email.toLowerCase(),
          subscribedAt: new Date(),
          mailchimpStatus: 'failed',
          mailchimpError: (error as any).detail || 'Unknown error',
          ipAddress: clientIP,
          lastUpdated: new Date()
        });
        logger.info('Failed subscription stored in Firestore', { email, ip: clientIP });
      } catch (firestoreError) {
        logger.error('Failed to store failed subscription in Firestore', { email, error: firestoreError, ip: clientIP });
      }

      // Provide user-friendly error messages for common cases
      let userMessage = 'Subscription failed. Please try again.';
      const errorDetail = (error as any).detail || '';

      if (errorDetail.includes('has signed up to a lot of lists very recently')) {
        userMessage = 'This email has been used for many recent signups. Please try again later or use a different email address.';
      } else if (errorDetail.includes('Member Exists')) {
        userMessage = 'This email is already subscribed to our newsletter!';
      } else if (errorDetail.includes('Invalid Resource')) {
        userMessage = 'Please enter a valid email address.';
      } else if (errorDetail.includes('API key')) {
        userMessage = 'Service temporarily unavailable. Please try again later.';
      }

      response.status(400).json({
        message: userMessage
      });
    }
  } catch (error) {
    logger.error('Newsletter subscription error', { error, ip: clientIP });
    response.status(500).json({ message: 'Internal server error' });
  }
});
*/
