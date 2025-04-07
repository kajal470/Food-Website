import React from "react"
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
const Contact = () => {
    return (
        <>
            <Navbar />

           <section className="contact-section">
  <div className="contact-container">
    <h2>Contact Us</h2>
    <p>Have any questions? Feel free to reach out!</p>
    <div className="contact-content">
      <div className="contact-info">
        <h3>Our Location</h3>
        <p><strong>Address:</strong> 123, Main Street, Jalandhar, India</p>
        <p><strong>Phone:</strong> +91 98765 43210</p>
        <p><strong>E-mail:</strong> contact@foodieshub.com</p>
        <h3>Follow Us</h3>
        <div className="social-icons">
          <a href="#"><i className="fa fa-facebook" /></a>
          <a href="#"><i className="fa fa-instagram" /></a>
          <a href="#"><i className="fa fa-twitter" /></a>
          <a href="#"><i className="fa fa-youtube" /></a>
        </div>
      </div> 
      <div className="contact-form">
        <h3>Send a Message</h3>
        <form action="#" method="post">
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <input type="text" name="subject" placeholder="Subject" />
          <textarea name="message" rows={5} placeholder="Your Message" required defaultValue={""} />
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
    <div className="map-container">
      <h3>Find Us on Map</h3>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13766.045889637356!2d75.57618201380461!3d31.326015455319514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5b48830d6b05%3A0xd60f1f2c5bd1d5f6!2sLyallpur%20Khalsa%20College!5e0!3m2!1sen!2sin!4v1710890102396!5m2!1sen!2sin" width="100%" height={300} style={{border: 0}} allowFullScreen loading="lazy" />
    </div>
  </div>
</section>

    




            <Footer />
        </>

    )
}
export default Contact;
