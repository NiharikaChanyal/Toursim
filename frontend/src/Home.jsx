import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const [packages, setPackages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch packages from backend
        const fetchAllPackages = async () => {
            try {
                const res = await axios.get("https://city-tourism-booking-guide.onrender.com/api/packages/all");
                setPackages(res.data);
            } catch (err) {
                console.error("Error fetching packages for home", err);
            }
        };
        fetchAllPackages();
    }, []);   

    return (
        <div className="home-container">
            <div className="top_section"  style={{ 
                backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/assets/img/clocktower.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '600px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                color: 'white'
            }}>
                <h1>Explore Lucknow</h1>
                <p>The City of Nawabs Awaits You!</p>
                <button className="btn btn-custom" style={{width:'12%',height:'50px'}}>View Gallery</button>
            </div>


           {/* --- ABOUT SECTION --- */}
            <div className="container about-section mt-5">
                <h2 className="mb-4 section-title" style={{  color: '#2c3e50' ,fontSize: '32px', fontWeight: 'bold' }}>Welcome to Lucknow Tourism</h2>
                <div className="row">
                    <div className="col-md-6">
                        <img src="/assets/img/rumi2.jpg" alt="Lucknow Heritage" style={{height:'280px', marginTop:'30px'}} className="img-fluid rounded shadow"/>
                    </div>
                    <div className="col-md-6 about-text" style={{ marginTop: '10px' }}>
                        <p style={{ fontSize: '16px' }}>
                            At Lucknow Tourism, our mission is to showcase the charm, culture, and rich history of the City of Nawabs.
                            We provide travelers with authentic experiences – from heritage walks and food tours to exploring architectural marvels like Bara Imambara and Rumi Darwaza.
                        </p>
                        <p style={{ fontSize: '16px' }}>
                            Whether you are a history enthusiast, a foodie, or simply looking for a memorable getaway,
                            we ensure your journey through Lucknow is truly unforgettable. To establish Lucknow as a globally recognized cultural tourism hub, where travelers from across the world come to explore its royal heritage, architectural marvels, and vibrant lifestyle.
                        </p>
                    </div>
                </div>
            </div>

            {/* --- ABOUT AT A GLANCE SECTION --- */}
            <div className="container" style={{ marginTop: '60px', marginBottom: '60px' }}>
                <h2 className="section-title  mb-4" style={{ fontSize: '32px', fontWeight: 'bold' }}>About Lucknow at a Glance</h2>
                <div className="row">
                    <div className="col-md-6">
                        <p style={{ lineHeight: '1.8', textAlign: 'justify' }}>
                            Lucknow, the capital of Uttar Pradesh, is known for its Nawabi culture, architecture, poetry, and cuisine.
                            The city beautifully blends the charm of its historical past with the pace of modern growth.
                            From ancient monuments to bustling bazaars, every corner tells a story of grace and grandeur.
                        </p>
                        <ul style={{ fontSize: '16px', lineHeight: '2', listStyle: 'none', paddingLeft: '0' }}>
                            <li>🏰 <strong>Heritage:</strong>Imambaras, Rumi Darwaza, Residency</li>
                            <li>🍢<strong>Cuisine:</strong>Kababs, Biryani, Tunday kababi</li>
                            <li>🎭<strong>Culture:</strong>Kathak, Chikankari, Urdu poetry</li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        {/* Map Iframe */}
                        <iframe title="Lucknow Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113896.34568160017!2d80.85966627581552!3d26.848692556272523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd991f32b16b%3A0x93ccba8909978be7!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000" 
                        width="100%" height="300"style={{ border: '0', borderRadius: '10px' }}allowFullScreen="" loading="lazy"></iframe>
                    </div>
                </div>
            </div>


            {/* --- EXPERIENCE --- */}
            <div className="container-fluid highlights" style={{marginTop:'80px',padding:'40px'}}>
            <h2 className="section-title text center mb-5" style={{ fontSize: '32px', fontWeight: 'bold' }}>Experience Lucknow Like Never Before</h2>
            <div className="row text-center">
                {/* Tour destination */}
                <div className="col-md-3">
                    <a href='/about' style={{textDecoration:'none', color:'inherit'}}>
                    <div className="highlight-box p-3 shadow-sm rounded">
                        <i className="fa fa-briefcase" style={{fontSize:'40px',color:'#2c3e50',marginBottom:'15px'}}></i>
                        <h4>Tour Destinations</h4>
                        <p>Custom packages for families, couples, and solo travelers</p>
                    </div>
                    </a>
                </div>                

            {/* Food Trails */}
            <div className="col-md-3">
                <a href='' style={{textDecoration:'none',color:'inherit'}}>
                    <div className="highlight-box p-3 shadow-sm rounded">
                        <i className="fa fa-cutlery" style={{fontSize:'40px', color:'#2c3e50',marginBottom:'15px'}}></i>
                        <h4>Food Trails</h4>
                        <p>Experience the world-famous Tunday Kebabs and Lucknowi Biryani.</p>
                    </div>
                </a>
            </div>
            
            {/* Shopping */}
            <div className="col-md-3">
                <a href="/about" style={{textDecoration:'none',color:'inherit'}}>
                <div className="highlight-box p-3 shadow-sm rounded">
                    <i className="fa fa-shopping-cart" style={{fontSize:'40px',color:'#2c3e50',marginBottom:'15px'}}></i>
                    <h4>Shopping & Handicrafts</h4>
                    <p>Shop exquisite Chikankari and handicrafts at local bazaars.</p>
                </div>
                </a>
            </div>

        {/* Photo Gallery */}
        <div className="col-md-3">
            <a href="/gallery" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="highlight-box p-3 shadow-sm rounded">
                    <i className="fa fa-camera" style={{ fontSize: '40px', color: '#2c3e50', marginBottom: '15px' }}></i>
                    <h4>Photo Gallery</h4>
                    <p>Explore stunning visuals capturing Lucknow’s beauty and heritage.</p>
                </div>
            </a>
        </div>
    </div>
    </div>
    {/* --- CULTURAL HIGHLIGHTS CAROUSEL --- */}
<div className="container" style={{ marginTop: '60px', marginBottom: '60px' }}>
    <h2 className="section-title mb-4 text-center" style={{ fontSize: '32px', fontWeight: 'bold' }} >Cultural Highlights</h2>
    
    <div id="cultureCarousel" className="carousel slide" data-bs-ride="carousel">
        
        <div className="carousel-indicators">
            <button type="button" data-bs-target="#cultureCarousel" data-bs-slide-to="0" className="active" aria-current="true"></button>
            <button type="button" data-bs-target="#cultureCarousel" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#cultureCarousel" data-bs-slide-to="2"></button>
        </div>

        <div className="carousel-inner shadow-lg rounded">
            <div className="carousel-item active">
                <img src="/assets/img/mahotsav.jpg" className="d-block w-100" alt="Lucknow Mahotsav" style={{ height: '450px', objectFit: 'cover' }} />
                <div className="carousel-caption d-none d-md-block">
                    <h3 style={{ color: '#fff', textShadow: '2px 2px 4px #000', fontWeight: 'bold' }}>Lucknow Mahotsav</h3>
                    <p>Celebrate art, music, and cuisine of the Nawabs every winter.</p>
                </div>
            </div>

            <div className="carousel-item">
                <img src="/assets/img/chikankari.jpg" className="d-block w-100" alt="Chikankari Art" style={{ height: '450px', objectFit: 'cover' }} />
                <div className="carousel-caption d-none d-md-block">
                    <h3 style={{ color: '#fff', textShadow: '2px 2px 4px #000', fontWeight: 'bold' }}>Chikankari Art</h3>
                    <p>Discover hand-embroidered elegance — a craft centuries old.</p>
                </div>
            </div>

            <div className="carousel-item">
                <img src="/assets/img/kathak1.jpg" className="d-block w-100" alt="Kathak Dance" style={{ height: '450px', objectFit: 'cover' }} />
                <div className="carousel-caption d-none d-md-block">
                    <h3 style={{ color: '#fff', textShadow: '2px 2px 4px #000', fontWeight: 'bold' }}>Kathak Performances</h3>
                    <p>Watch classical dance inspired by Lucknow Gharana traditions.</p>
                </div>
            </div>
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#cultureCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#cultureCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
    </div>
</div>

{/* --- POPULAR PLACES --- */}
<div className="container" style={{marginTop:'20px'}}>
    <h2 className="section-title" style={{ fontSize: '32px', fontWeight: 'bold' }}>Famous Places in Lucknow</h2>
    <div className="row">
        <div className="col-md-3 place-card">
            <img src="/assets/img/rumi2.jpg" alt="Rumi Gate"/><h4>Rumi Darwaza</h4><p>The iconic gateway symbolizing Lucknow’s grandeur.</p>
        </div>
        <div class="col-md-3 place-card">
            <img src="/assets/img/imambara.jpg" alt="Bara Imambara"/><h4>Bara Imambara</h4><p>Mughal architecture with the famous Bhool Bhulaiya labyrinth.</p>
        </div>
        <div class="col-md-3 place-card">
            <img src="/assets/img/clocktower.jpg" alt="Clock Tower"/><h4>Clock Tower</h4><p>A beautiful creature that embraces our eyes with its structure.</p>
        </div>
        <div class="col-md-3 place-card">
            <img src="/assets/img/chota_imambara.jpg" alt="Chota Imambara"/><h4>Chota Imambara</h4><p>Beautiful illuminated monument with chandeliers and architecture.</p>
        </div>
    </div>
</div>

{/* --- TOUR PACKAGES --- */}
<div className="container" id="packages" style={{ marginTop: '20px' }}>
    <h2 className="section-title text-center mb-5" style={{ fontWeight: 'bold', fontSize: '32px' }}>
        Top Tour Packages
    </h2>

    <div className="row">        
        {/* Heritage City Tour */}
        <div className="col-md-3">
            <div className="card card-default  shadow-sm">
                <div className="card-heading text-center">
                    <strong>Heritage City Tour</strong>
                </div>
                <div className="card-body text-center">
                    <p style={{ fontSize: '18px', color: '#28a745', fontWeight: 'bold' }}>₹1,500 per person</p>
                    <p>Visit Rumi Darwaza, Imambaras & more.</p>
                    <button className="btn btn-success" 
                    onClick={() => navigate('/packages')}> Book Now</button>
                </div>
            </div>
        </div>

        {/* Spiritual Trail */}
        <div className="col-md-3">
            <div className="card card-default shadow-sm">
                <div className="card-heading text-center">
                    <strong>Spiritual Trail</strong>
                </div>
                <div className="card-body text-center">
                    <p style={{ fontSize: '18px', color: '#28a745', fontWeight: 'bold' }}>₹1,800 per person</p>
                    <p>2 Days – Explore Temples & Mosques.</p>
                    <button className="btn btn-success" 
                    onClick={() => navigate('/packages')}> Book Now</button>
                </div>
            </div>
        </div>

        {/* Parks & Gardens */}
        <div className="col-md-3">
            <div className="card card-default shadow-sm">
                <div className="card-heading text-center">
                    <strong>Parks & Gardens</strong>
                </div>
                <div className="card-body text-center">
                    <p style={{ fontSize: '18px', color: '#28a745', fontWeight: 'bold' }}>₹3,000 per person</p>
                    <p>3 Days – Nature and Zoo Exploration.</p>
                    <button className="btn btn-success" 
                    onClick={() => navigate('/packages')}> Book Now</button>
                </div>
            </div>
        </div>

        {/* Food & Cuisine Tour */}
        <div className="col-md-3">
            <div className="card card-default shadow-sm">
                <div className="card-heading text-center">
                    <strong>Food & Cuisine Tour</strong>
                </div>
                <div className="card-body text-center">
                    <p style={{ fontSize: '18px', color: '#28a745', fontWeight: 'bold' }}>₹1,000 per person</p>
                    <p>Experience Nawabi cuisine & rich food.</p>
                    <button className="btn btn-success" 
                    onClick={() => navigate('/packages')}> Book Now</button>
                </div>
            </div>
        </div>

    </div>
</div>


{/* --- WHY VISIT --- */}
<div className="container" id="packages" style={{marginTop:'20px'}}>
    <h2 className="section-title" style={{ fontSize: '32px', fontWeight: 'bold' }}>Why Visit Lucknow</h2>
    <div className="row">
        <div className="col-md-4">
            <a href="/about" style={{textDecoration:'none',color:'inherit'}}>
            <div className="highlight-box">
                <i className="fa fa-book"></i>
                <h4 style={{fontWeight:'500'}}>Rich History</h4>
                <p>Explore Mughal & Nawabi heritage through monuments, museums, and old city streets.</p>
            </div>
            </a>            
        </div>
        <div className="col-md-4">
             <a href="/about" style={{textDecoration:'none',color:'inherit'}}>
            <div className="highlight-box">
                <i className="fa fa-delicious"></i>
                <h4 style={{fontWeight:'500'}}>Delicious Cuisine</h4>
                <p>Treat your taste buds with kebabs, biryanis, sweets, and street food.</p>
            </div>
                 </a>
        </div>
        <div className="col-md-4">
             <a href="/about" style={{textDecoration:'none',color:'inherit'}}>
            <div className="highlight-box">
                <i className="fa fa-music"></i>
                <h4 style={{fontWeight:'500'}}>Cultural Experience</h4>
                <p>Enjoy traditional music, dance, festivals, and handicrafts of Lucknow.</p>
            </div>
             </a>
        </div>
    </div>
</div>


{/* --- LUCKNOWI FOOD --- */}
<div className="container" style={{marginTop:'20px'}}>
    <h2 className="section-title" style={{ fontSize: '32px', fontWeight: 'bold' }}>Taste of Lucknow</h2>
    <p style={{textAlign:'center', fontSize:'18px', maxWidth:'900px', margin:'auto'}}>
        Lucknow is known worldwide for its rich Nawabi cuisine. Here’s what you shouldn't miss!
    </p><br></br>
    <div className="row text-center">
        
        {/* Tunday Kebabs */}
        <div className="col-md-3 place-card">
            <img src="/assets/img/kabab.jpg" alt="Tunday Kebabs" className="img-responsive img-thumbnail shadow" 
                style={{ height: '200px', width: '100%', objectFit: 'cover' }}/>
            <h5 style={{ marginTop: '15px' }}>Tunday Kebabs</h5>
            <p>Soft, flavorful kebabs that melt in your mouth.</p>
        </div>

        {/* Lucknowi Biryani */}
        <div className="col-md-3 place-card">
            <img src="/assets/img/biryani.jpg" alt="Lucknowi Biryani" 
                className="img-responsive img-thumbnail shadow" style={{ height: '200px', width: '100%', objectFit: 'cover' }}/>
            <h5 style={{ marginTop: '15px' }}>Lucknowi Biryani</h5>
            <p>Fragrant rice flavored with spices and tender meat.</p>
        </div>

        {/* Malai Kulfi */}
        <div className="col-md-3 place-card">
            <img src="/assets/img/kulfi.jpg" alt="Malai Kulfi" 
                className="img-responsive img-thumbnail shadow"style={{ height: '200px', width: '100%', objectFit: 'cover' }}/>
            <h5 style={{ marginTop: '15px' }}>Malai Kulfi</h5>
            <p>A traditional creamy dessert of Lucknow.</p>
        </div>

        {/* Sharmaji ki Chai */}
        <div className="col-md-3 place-card">
            <img src="/assets/img/chai.jpg" alt="Sharmaji ki Chai" 
                className="img-responsive img-thumbnail shadow" style={{ height: '200px', width: '100%', objectFit: 'cover' }}/>
            <h5 style={{ marginTop: '15px' }}>Sharmaji ki Chai</h5>
            <p>Experience the iconic tea of Hazratganj.</p>
        </div>
    </div>
</div>


{/* ---TESTIMONALS --- */}
<div className="container">
    <h2 className="section-title " style={{ fontSize: '32px', fontWeight: 'bold' }}>What Travelers Say</h2>
    <div className="row">
        <div className="col-md-4"><blockquote>"Amazing experience! The tour guide was knowledgeable and friendly."<h6>– Aditi Verma</h6></blockquote></div>
        <div className="col-md-4"><blockquote>"Loved the city and the food! Highly recommend Lucknow Tourism."<h6>– Rahul Singh</h6></blockquote></div>
        <div className="col-md-4"><blockquote>"A perfect weekend trip full of history and hospitality."<h6>– Neha Sharma</h6></blockquote></div>
    </div>
</div>


{/* --- MISSION --- */}
<div className="container mission">
    <h2 className="section-title  text-center" style={{ fontSize: '32px', fontWeight: 'bold' }}>Our Mission & Vision</h2>
    <div className="row">
        <div className="col-md-4"><img src="/assets/img/crafts.jpg" alt="craft"/></div>
        <div className="col-md-4"><img src="/assets/img/mahotsav.jpg" alt="mahotsav"/></div>
        <div className="col-md-4"><img src="/assets/img/handicraft.jpg" alt="handicraft"/></div>
    </div><br></br>
    <p style={{fontSize :'15px', fontWeight:'light', textAlign:'center'}}>
    To promote Lucknow as a global cultural destination while preserving its traditions, art, and heritage.
    We aim to connect travelers with the heart of the city and create everlasting memories.
    To establish Lucknow as a globally recognized cultural tourism hub, where travelers from across the world come 
    to explore its royal heritage, architectural marvels, and vibrant lifestyle.</p>
</div>


{/* --- FAQ SECTION --- */}
<div className="container" style={{ marginTop: '40px', marginBottom: '50px' }}>
    <h2 className="section-title text-center mb-4" style={{ fontSize: '32px', fontWeight: 'bold' }}>
        Frequently Asked Questions
    </h2>
    
    <div className="accordion" id="faqAccordion">
        
        {/* Question 1 */}
        <div className="accordion-item shadow-sm mb-3" style={{ border: 'none', borderRadius: '10px' }}>
            <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq1" aria-expanded="true" aria-controls="faq1" style={{ backgroundColor: '#fff', color: '#333', borderRadius: '10px' }}>
                    1. What is the best time to visit Lucknow?
                </button>
            </h2>
            <div id="faq1" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                <div className="accordion-body" style={{ color: '#666', backgroundColor: '#f9f9f9' }}>
                    October to March is the best time when the weather is pleasant.
                </div>
            </div>
        </div>
        
        {/* Question 2 */}
        <div className="accordion-item shadow-sm mb-3" style={{ border: 'none', borderRadius: '10px' }}>
            <h2 className="accordion-header" id="headingTwo">
                <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq2" aria-expanded="false" aria-controls="faq2" style={{ backgroundColor: '#fff', color: '#333', borderRadius: '10px' }}>
                    2. What are the famous foods to try?
                </button>
            </h2>
            <div id="faq2" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
                <div className="accordion-body" style={{ color: '#666', backgroundColor: '#f9f9f9' }}>
                    Tunday Kebabs, Lucknowi Biryani, Kulfi, Sheermal, and street food at Aminabad.
                </div>
            </div>
        </div>
        
        {/* Question 3 */}
        <div className="accordion-item shadow-sm mb-3" style={{ border: 'none', borderRadius: '10px' }}>
            <h2 className="accordion-header" id="headingThree">
                <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq3" aria-expanded="false" aria-controls="faq3" style={{ backgroundColor: '#fff', color: '#333', borderRadius: '10px' }}>
                    3. Is Lucknow safe for tourists?
                </button>
            </h2>
            <div id="faq3" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
                <div className="accordion-body" style={{ color: '#666', backgroundColor: '#f9f9f9' }}>
                    Yes! Lucknow is one of the safest and most welcoming cities in India.
                </div>
            </div>
        </div>

    </div>
</div>


{/* --- CALL TO ACTION (CTA) --- */}
<div className="cta-section text-center">
        <h2 >Plan Your Trip to Lucknow Today!</h2>
        <p>Book tours, discover packages, and explore the royal heritage of the City of Nawabs.</p>
        <a href="/packages" className="btn btn-lg" style={{ backgroundColor: 'white',color: '#009999', fontWeight:'bold',transition: '0.3s'}}>
        Start Exploring</a>
</div>




</div> 
    );
};      

const PlaceCard = ({ image, title, desc }) => (
    <div className="col-md-6 place-card text-center mb-4">
        <img src={image} alt={title} className="img-fluid rounded" style={{ height: '250px', width: '100%', objectFit: 'cover' }} />
        <h4>{title}</h4>
        <p>{desc}</p>
    </div>
);

export default Home;