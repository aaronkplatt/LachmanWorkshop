/**
 * Firebase Functions - Simple Hello World
 * 
 * This is a basic Firebase Functions setup with a simple Hello World function.
 * 
 * To enable newsletter functionality:
 * 1. Uncomment the import in newsletter.ts
 * 2. Add the newsletter function to the exports below
 * 3. Set up the required environment variables
 */

import * as functions from "firebase-functions";

// Simple Hello World function
export const helloWorld = functions.https.onRequest((request: any, response: any) => {
  functions.logger.info("Hello World function called!", { structuredData: true });

  // Enable CORS
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.set('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    response.status(204).send('');
    return;
  }

  response.json({
    message: "Hello World from Firebase Functions!",
    timestamp: new Date().toISOString(),
    method: request.method,
    path: request.path
  });
});

// Newsletter function - COMMENTED OUT
// Uncomment the line below to enable newsletter functionality
// export { newsletter } from './newsletter';
