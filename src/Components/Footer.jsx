import '../Assests/Css/Footer.css';
import fb from '../Assests/Images/Vector.png';
import youtube from '../Assests/Images/youtube 1.png';
import insta from '../Assests/Images/instagram 1.png';
import twitter from '../Assests/Images/Vector (3).png';

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          {/* Logo and Contact Section */}
          <div className="footer-section footer-logo-section">
            <div className="footer-logo">
              <img
                src="/images/FACEHIRE-LOGO.png"
                alt="Facehiring Logo"
                className="footer-logo-img"
              />
            </div>
            <div className="footer-contact">
              <p className="footer-num">
                Call now: <span>(91) 9635875248</span>
              </p>
              <p className="footer-address">
                6391 Elgin St. Celina, Delaware 10299, Uppal,<br/> 
                Hyderabad, Telangana
              </p>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="footer-section">
            <h3 className="footer-heading">Quick Link</h3>
            <ul className="footer-links">
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </div>

          {/* Candidate Section */}
          <div className="footer-section">
            <h3 className="footer-heading">Candidate</h3>
            <ul className="footer-links">
              <li><a href="#browse-jobs">Browse Jobs</a></li>
              <li><a href="#browse-employers">Browse Employers</a></li>
              <li><a href="#candidate-dashboard">Candidate Dashboard</a></li>
              <li><a href="#saved-jobs">Saved Jobs</a></li>
            </ul>
          </div>

          {/* Employers Section */}
          <div className="footer-section">
            <h3 className="footer-heading">Employers</h3>
            <ul className="footer-links">
              <li><a href="#post-job">Post a Job</a></li>
              <li><a href="#browse-candidates">Browse Candidates</a></li>
              <li><a href="#employer-dashboard">Employers Dashboard</a></li>
              <li><a href="#applications">Applications</a></li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="footer-section">
            <h3 className="footer-heading">Support</h3>
            <ul className="footer-links">
              <li><a href="#faqs">Faqs</a></li>
              <li><a href="#privacy-policy">Privacy Policy</a></li>
              <li><a href="#terms-conditions">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Copyright Section */}
      <section className="copyright">
        <div className="copyright-container">
          <div className="copyright-text">
            <p className="copyright-content">@ 2025 FaceHiring - Job Portal. All rights Reserved</p>
          </div>
          <div className="social-links">
            <a href="#facebook" className="social-link">
              <img src={fb} alt="Facebook" />
            </a>
            <a href="#youtube" className="social-link">
              <img src={youtube} alt="YouTube" />
            </a>
            <a href="#instagram" className="social-link">
              <img src={insta} alt="Instagram" />
            </a>
            <a href="#twitter" className="social-link">
              <img src={twitter} alt="Twitter" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Footer;