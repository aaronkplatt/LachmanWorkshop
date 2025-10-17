export default function Contact() {
  return (
    <section id="contact" className="py-5 bg-dark text-white">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h2 className="h1 mb-4 text-warning">Contact Us</h2>
            <p className="lead mb-4">
              Want to collaborate, ask questions, or just say hi?
            </p>
            <div className="mb-4">
              <a
                href="mailto:hello@yourproject.com"
                className="btn btn-outline-warning btn-lg px-4"
              >
                <i className="bi bi-envelope me-2"></i>
                hello@yourproject.com
              </a>
            </div>
            <div className="d-flex justify-content-center gap-4">
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light rounded-circle"
                style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <i className="bi bi-instagram fs-4"></i>
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light rounded-circle"
                style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <i className="bi bi-twitter fs-4"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 