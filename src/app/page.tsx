'use client';

//jordan - Frontend updates and styling changes go here
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Features from '../components/Features';
// import Newsletter from '../mockFeatures/Newsletter'; // Uncomment to enable newsletter functionality
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div>
      <Navigation />
      <Hero />
      <About />
      <Features />
      {/* <Newsletter /> Uncomment to enable newsletter functionality */}
      <Contact />
      <Footer />
    </div>
  );
}
