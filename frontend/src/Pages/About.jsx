import React from "react"
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
const About = () => {
    const img1 = "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/bd/2b/b4/main-lounge.jpg?w=600&h=-1&s=1"
    return (
        <>
            <Navbar />

           <div>
  <section className="about-section">
    <div className="about-container">
      <h2>Welcome to Foodie's Hub</h2>
      <p>Your go-to destination for delicious and freshly made meals.</p>
      <div className="about-content">
        <div className="about-text">
          <h3>Our Story</h3>
          <p>Founded in 2024, Foodie's Hub was created with a passion for delivering fresh, high-quality meals in a warm and welcoming environment. Our chefs use the finest ingredients to craft mouthwatering dishes that satisfy every taste bud.</p>
          <h3>Our Mission</h3>
          <p>We believe in serving food that not only tastes great but also brings people together. Our mission is to provide a memorable dining experience with exceptional service and quality ingredients.</p>
          <h3>Our Vision</h3>
          <p>To become the most loved restaurant by food enthusiasts, known for its authenticity, innovation, and delightful flavors.</p>
        </div>
        <div className="about-image">
          <img src={img1} alt="Restaurant Image" />
        </div>
      </div>
    </div>
  </section>
 
  <section className="team-section">
    <h2>Meet Our Chefs</h2>
    <div className="team-container">
      <div className="team-member">
        <img src="https://i.pinimg.com/736x/12/ac/60/12ac606896dfc98f4806b7acababed67.jpg" alt="Chef John" />
        <h3>Chef John Doe</h3>
        <p>Head Chef</p>
      </div>
      <div className="team-member">
        <img src="https://thumbs.dreamstime.com/b/female-chef-14984977.jpg" alt="Chef Emma" />
        <h3>Chef Emma Smith</h3>
        <p>Pastry Specialist</p>
      </div>
      <div className="team-member">
        <img src="https://c8.alamy.com/comp/EPAC0A/happy-male-chef-cook-cooking-food-EPAC0A.jpg" alt="Chef Michael" />
        <h3>Chef Michael Brown</h3>
        <p>Grill Expert</p>
      </div>
    </div>
  </section>
</div>


            <Footer />
        </>

    )
}
export default About;