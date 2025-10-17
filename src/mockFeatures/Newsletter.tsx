// 'use client';
// import { useState, useEffect, useRef } from "react";

// declare global {
//   interface Window {
//     grecaptcha: {
//       ready: (callback: () => void) => void;
//       render: (element: string | HTMLElement, options: { sitekey: string; theme?: string; size?: string }) => number;
//       getResponse: (widgetId: number) => string;
//       reset: (widgetId: number) => void;
//     };
//   }
// }

// export default function Newsletter() {
//   const [newsletterStatus, setNewsletterStatus] = useState<null | string>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showThankYou, setShowThankYou] = useState(false);
//   const recaptchaWidgetIdRef = useRef<number | null>(null);

//   // Check if newsletter functionality is enabled
//   const isNewsletterEnabled = process.env.NEXT_PUBLIC_ENABLE_NEWSLETTER === 'true';
//   const hasRecaptcha = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY !== '';

//   // Initialize reCAPTCHA when component mounts (only if enabled)
//   useEffect(() => {
//     if (isNewsletterEnabled && hasRecaptcha && typeof window !== 'undefined' && window.grecaptcha) {
//       window.grecaptcha.ready(() => {
//         const widgetId = window.grecaptcha.render('recaptcha-container', {
//           sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
//           theme: 'light',
//           size: 'normal'
//         });
//         recaptchaWidgetIdRef.current = widgetId;
//       });
//     }
//   }, [isNewsletterEnabled, hasRecaptcha]);

//   // Reset form and scroll to newsletter section
//   const handleRefresh = () => {
//     setShowThankYou(false);
//     setNewsletterStatus(null);
//     document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' });
//   };

//   // Handle newsletter form submission
//   async function handleNewsletterSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();

//     if (!isNewsletterEnabled) {
//       setNewsletterStatus("Newsletter functionality is not enabled.");
//       return;
//     }

//     const form = e.currentTarget;
//     const email = (form.elements.namedItem("email") as HTMLInputElement).value;

//     // Validate reCAPTCHA (only if enabled)
//     if (hasRecaptcha) {
//       if (recaptchaWidgetIdRef.current === null || !window.grecaptcha) {
//         setNewsletterStatus("Please complete the reCAPTCHA verification.");
//         return;
//       }

//       const recaptchaResponse = window.grecaptcha.getResponse(recaptchaWidgetIdRef.current);
//       if (!recaptchaResponse) {
//         setNewsletterStatus("Please complete the reCAPTCHA verification.");
//         return;
//       }
//     }

//     // Submit to API
//     setNewsletterStatus(null);
//     setIsLoading(true);

//     try {
//       const requestBody: any = { email };
//       if (hasRecaptcha && recaptchaWidgetIdRef.current !== null) {
//         requestBody.recaptchaToken = window.grecaptcha.getResponse(recaptchaWidgetIdRef.current);
//       }

//       const res = await fetch(`https://us-central1-${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.cloudfunctions.net/newsletter`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(requestBody),
//       });

//       const data = await res.json();
//       setNewsletterStatus(data.message);

//       // Show thank you view on success
//       if (data.message.includes('Thank you')) {
//         setShowThankYou(true);
//       }

//       // Reset form
//       form.reset();

//     } catch {
//       setNewsletterStatus("An error occurred. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   // Don't render newsletter section if not enabled
//   if (!isNewsletterEnabled) {
//     return null;
//   }

//   return (
//     <section id="newsletter" className="py-5">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-lg-8 text-center">
//             <h2 className="h1 mb-4 text-warning">Stay Connected</h2>
//             <p className="lead text-muted mb-5">
//               Get the latest updates, tips, and exclusive offers—straight to your inbox!
//             </p>
//             <div className="row justify-content-center">
//               <div className="col-md-8 col-lg-6">
//                 {showThankYou ? (
//                   <div className="text-center">
//                     <div className="alert alert-success mb-4">
//                       <h4 className="alert-heading">🎉 Thank you for subscribing!</h4>
//                       <p className="mb-0">Welcome to our community! You&apos;ll be the first to know about our latest updates and exclusive offers.</p>
//                     </div>
//                     <button
//                       onClick={handleRefresh}
//                       className="btn btn-warning btn-lg px-4 fw-semibold text-dark"
//                     >
//                       Subscribe Another Email
//                     </button>
//                   </div>
//                 ) : (
//                   <>
//                     <form onSubmit={handleNewsletterSubmit}>
//                       <div className="input-group input-group-lg mb-3">
//                         <input
//                           type="email"
//                           name="email"
//                           className="form-control"
//                           placeholder="Enter your email address"
//                           required
//                           disabled={isLoading}
//                         />
//                         <button
//                           type="submit"
//                           className="btn btn-warning px-4 fw-semibold text-dark"
//                           disabled={isLoading}
//                         >
//                           {isLoading ? (
//                             <>
//                               <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                               Subscribing...
//                             </>
//                           ) : (
//                             'Subscribe'
//                           )}
//                         </button>
//                       </div>
//                       {hasRecaptcha && (
//                         <div className="d-flex justify-content-center">
//                           <div id="recaptcha-container"></div>
//                         </div>
//                       )}
//                     </form>
//                     {newsletterStatus && (
//                       <div className={`alert mt-3 ${newsletterStatus.includes('Thank you')
//                         ? 'alert-success'
//                         : 'alert-danger'
//                         }`}>
//                         {newsletterStatus}
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// } 