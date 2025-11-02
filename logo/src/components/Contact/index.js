import React from "react";
import "./index.css";

const Contact = () => {
  return (
    <main className="contact-page">
      <h1>Contact Us</h1>
      <p>If you have any questions, feel free to reach out!</p>
      <div className="contact-info">
        <p>Email: support@example.com</p>
        <p>Phone: +91 9876543210</p>
        <p>Address: 123 Shopping Lane, New Delhi, India</p>
      </div>
      <form className="contact-form">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" required />
        <button type="submit">Send Message</button>
      </form>
    </main>
  );
};

export default Contact;
