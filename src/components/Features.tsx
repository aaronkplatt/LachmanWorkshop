export default function Features() {
  return (
    <section id="features" className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="h1 mb-3 text-dark">Our Features</h2>
          <p className="lead text-muted">Everything you need to succeed</p>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center p-4">
                <div className="mb-3">
                  <span className="display-4">🚀</span>
                </div>
                <h5 className="card-title fw-bold text-warning">Fast Performance</h5>
                <p className="card-text text-muted">
                  Built with Next.js 15 and optimized for speed.
                  Your users will love the lightning-fast experience.
                </p>
                <div className="mt-3">
                  <span className="badge bg-dark">Next.js 15</span>
                  <span className="badge bg-warning text-dark ms-2">Optimized</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center p-4">
                <div className="mb-3">
                  <span className="display-4">🔥</span>
                </div>
                <h5 className="card-title fw-bold text-warning">Firebase Backend</h5>
                <p className="card-text text-muted">
                  Scalable infrastructure with Firebase hosting, functions, and Firestore.
                  Deploy with confidence.
                </p>
                <div className="mt-3">
                  <span className="badge bg-info">Firebase</span>
                  <span className="badge bg-success ms-2">Scalable</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center p-4">
                <div className="mb-3">
                  <span className="display-4">💎</span>
                </div>
                <h5 className="card-title fw-bold text-warning">Modern Design</h5>
                <p className="card-text text-muted">
                  Beautiful, responsive design with Bootstrap 5.
                  Looks great on every device and screen size.
                </p>
                <div className="mt-3">
                  <span className="badge bg-danger">Bootstrap 5</span>
                  <span className="badge bg-primary ms-2">Responsive</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 