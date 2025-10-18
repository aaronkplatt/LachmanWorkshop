export default function Hero() {
  return (
    <section className="py-section text-center bg-light fade-in">
      <div className="container vh-100">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1 className="display-custom mb-4 text-primary">
              Lachman Workshop
            </h1>
            <button
              className="btn btn-primary btn-lg px-4 py-3 hover-lift"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              WE HAVE BEGUN
            </button>

            {/* Color Showcase */}
            <div className="mt-5">
              <h3 className="text-primary mb-3">Color Palette Showcase</h3>
              <div className="row g-3">
                <div className="col-md-6 col-lg-4">
                  <div className="p-3 border rounded">
                    <h6 className="text-primary">Primary (Reseda Green)</h6>
                    <div className="bg-primary text-light p-2 rounded mb-2">Primary Background</div>
                    <button className="btn btn-primary me-2">Primary Button</button>
                    <span className="badge bg-primary">Primary Badge</span>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="p-3 border rounded">
                    <h6 className="text-secondary">Secondary (Coffee)</h6>
                    <div className="bg-secondary text-light p-2 rounded mb-2">Secondary Background</div>
                    <button className="btn btn-secondary me-2">Secondary Button</button>
                    <span className="badge bg-secondary">Secondary Badge</span>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="p-3 border rounded">
                    <h6 className="text-info">Info (Lion)</h6>
                    <div className="bg-info text-light p-2 rounded mb-2">Info Background</div>
                    <button className="btn btn-info me-2">Info Button</button>
                    <span className="badge bg-info">Info Badge</span>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="p-3 border rounded">
                    <h6 className="text-success">Success (Ash Gray)</h6>
                    <div className="bg-success text-light p-2 rounded mb-2">Success Background</div>
                    <button className="btn btn-success me-2">Success Button</button>
                    <span className="badge bg-success">Success Badge</span>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="p-3 border rounded">
                    <h6 className="text-warning">Warning (Dun)</h6>
                    <div className="bg-warning text-dark p-2 rounded mb-2">Warning Background</div>
                    <button className="btn btn-warning me-2">Warning Button</button>
                    <span className="badge bg-warning text-dark">Warning Badge</span>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="p-3 border rounded">
                    <h6 className="text-danger">Danger (Coffee)</h6>
                    <div className="bg-danger text-light p-2 rounded mb-2">Danger Background</div>
                    <button className="btn btn-danger me-2">Danger Button</button>
                    <span className="badge bg-danger">Danger Badge</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}