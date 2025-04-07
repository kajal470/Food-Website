import React from "react"
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <Navbar />
        
            <section>
                <div className="background">
                    <div className="overlay" />
                    <div className="content">
                        <h1 className="head">ENJOY YOUR DELICIOUS MEAL</h1>
                        <p className="des">Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
                       <Link to={'/reservation'} > <button>Book A Table</button></Link>
                    </div>
                </div>
            </section>
            <Footer />
        </>

    )
}
export default Home;
