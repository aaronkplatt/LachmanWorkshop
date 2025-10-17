export default function Hero() {
  return (
    <section className="py-section text-center section-primary fade-in">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <span className="display-1 d-block mb-3 slide-up">🚀✨</span>
            <h1 className="display-custom mb-4 text-dark">
              Your Amazing Project
            </h1>
            <p className="subheading-custom mb-4">
              A modern web application built with Next.js and Firebase.<br />
              <span className="fw-semibold">Ready to launch your next big idea.</span>
            </p>
            <button
              className="btn btn-warning btn-lg px-4 py-3 hover-lift"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 