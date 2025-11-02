import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = () => {
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    // Simulate saving or sending to backend
    console.log("Subscribed with:", email);
    setMessage("Thank you for subscribing!");
    setEmail("");

    // Optionally save in local storage
    const savedEmails = JSON.parse(localStorage.getItem("subscribers")) || [];
    localStorage.setItem("subscribers", JSON.stringify([...savedEmails, email]));
  };

  return (
    <footer className="footer">
      {/* ====== Newsletter Section ====== */}
      <div className="footer-top">
        <div className="newsletter">
          <h3>BE THE FIRST TO KNOW</h3>
          <p>Sign up for updates from MyCompany.</p>
        </div>

        <div className="subscribe">
          <input
            type="email"
            placeholder="Enter your e-mail..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSubscribe}>SUBSCRIBE</button>
        </div>

        {message && <p className="subscribe-message">{message}</p>}

        <div className="contact-info">
          <h4>CONTACT US</h4>
          <p>+44 221 133 5360</p>
          <p>customercare@mycompany.com</p>
          <h4>CURRENCY</h4>
          <p>🇮🇳 INR</p>
          <span>
            Transactions will be completed in INR and converted as needed.
          </span>
        </div>
      </div>

      <hr />

      {/* ====== Links Section ====== */}
      <div className="footer-main">
        <div className="footer-col">
          <h4>MyCompany</h4>
          <Link to="/about">About Us</Link>
          <Link to="/stories">Stories</Link>
          <Link to="/artisans">Artisans</Link>
          <Link to="/boutiques">Boutiques</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/policy">Privacy Policy</Link>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <Link to="/orders">Orders & Shipping</Link>
          <Link to="/seller">Join/Login as a Seller</Link>
          <Link to="/payment">Payment & Pricing</Link>
          <Link to="/returns">Return & Refunds</Link>
          <Link to="/faq">FAQs</Link>
          <Link to="/terms">Terms & Conditions</Link>
        </div>

        <div className="footer-col follow-col">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
          </div>

          <h4>We Accept</h4>
          <div className="payment-icons">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
              alt="Mastercard"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Visa.png"
              alt="Visa"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/30/Google_Pay_Logo.svg"
              alt="GPay"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Apple_Pay_logo.svg"
              alt="Apple Pay"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/PayPal_2014_logo.png"
              alt="PayPal"
            />
          </div>
        </div>
      </div>

      {/* ====== Footer Bottom ====== */}
      <div className="footer-bottom">
        <p>© 2025 MyCompany. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
