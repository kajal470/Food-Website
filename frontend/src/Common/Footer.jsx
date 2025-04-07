import React from "react";
const Footer = () => {
    return (

        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section about">
                    <h2>Foodie's Hub</h2>
                    <p>Enjoy the best meals with the finest ingredients. Visit us or order online for a delightful experience.</p>
                </div>
                <div className="footer-section links">
                    <h2>Quick Links</h2>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Menu</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
                <div className="footer-section contact">
                    <h2>Contact Us</h2>
                    <p><i className="fa fa-map-marker" /> Jalandhar, Punjab</p>
                    <p><i className="fa fa-phone" /> +91 98765 43210</p>
                    <p><i className="fa fa-envelope" /> contact@foodieshub.com</p>
                </div>
                <div className="footer-section social">
                    <h2>Follow Us</h2>
                    <a href="#"><i className="fa fa-facebook" /></a>
                    <a href="#"><i className="fa fa-instagram" /></a>
                    <a href="#"><i className="fa fa-twitter" /></a>
                    <a href="#"><i className="fa fa-youtube" /></a>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2025 Foodie's Hub | All Rights Reserved</p>
            </div>
        </footer>

    );
}

export default Footer;