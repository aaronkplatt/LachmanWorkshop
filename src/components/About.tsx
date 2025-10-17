import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <div className="mb-4">
              <Image
                src="/aboutPic.jpg"
                alt="Your Team"
                width={200}
                height={200}
                className="rounded-circle shadow hover-scale"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <h2 className="heading-custom mb-4 text-warning">About Us</h2>
            <p className="subheading-custom">
              We&apos;re passionate about building amazing digital experiences that make a difference.
              Our team combines creativity with technical expertise to deliver solutions that exceed expectations.
              <span className="d-block mt-2 text-accent">#Innovation #Excellence #Results</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 