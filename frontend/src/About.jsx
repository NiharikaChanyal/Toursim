import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Intro Section */}
      <div className="container about_section p-5 rounded">
        <h1 className='text-center'>Welcome to Lucknow Tourism</h1>
        <div className="row justify-content-center">
        <div className="col-lg-10 about-text">
         <p>
          Lucknow is the capital and largest city of Uttar Pradesh,India, renowned for its rich cultural heritage, particularly
          from the era of the Nawabs, which is reflected in its refined manners, classical arts, and distinct cuisine.
          At Lucknow Tourism, our mission is to showcase the charm, culture, and rich history of the City of Nawabs. 
          We provide travelers with authentic experiences – from heritage walks and food tours to exploring architectural marvels like Bara Imambara and Rumi Darwaza.
         </p>
         <p>
          Whether you are a history enthusiast, a foodie, or simply looking for a memorable getaway, we ensure your journey through
          Lucknow is truly unforgettable. Also known as the "City of Nawabs," it blends historic architecture with
          modern development, offering landmarks like the Bara Imambara and a vibrant present as an administrative, educational, and
          commercial hub. The city is also famous for its handicrafts, particularly chikan embroidery, and its delicious food, which
          includes kebabs and biryani. 
         </p>
        </div>
        </div>
      </div>

      {/* Highlights Section */}
      <div className="container mt-5">
        <h2 className="text-center mb-5 fw-bold" style={{ color: '#2c3e50' }}>Explore Lucknow</h2>

        {/* Row 1: Destinations (Image Left) */}
        <div className="row about-row align-items-center mb-5">
          <div className="col-md-6">
            <img src="/assets/img/rumi2.jpg" alt="Destinations" className="about-img img-fluid" />
          </div>
          <div className="col-md-6 px-lg-5">
            <h3 className="section-subtitle">Destinations</h3>
            <p className="section-text">
             Lucknow is a treasure trove of cultural and historical destinations that tell stories of its glorious past.
             From the grandeur of the Rumi Darwaza to the serenity of the British Residency, every landmark carries the
             essence of Nawabi heritage. The city is dotted with gardens, monuments, and museums that showcase architectural
             brilliance and Mughal artistry.
            </p>
          </div>
        </div>

        {/* Row 2: Food (Image Right) */}
        <div className="row about-row align-items-center mb-5 flex-md-row-reverse">
          <div className="col-md-6">
            <img src="/assets/img/kabab.jpg" alt="Cuisine" className="about-img img-fluid" />
          </div>
          <div className="col-md-6 px-lg-5">
            <h3 className="section-subtitle">Food & Cuisine</h3>
            <p className="section-text">
             The cuisine of Lucknow is world-famous for its royal Awadhi flavors and delicate cooking techniques.
             From melt-in-your-mouth kebabs to aromatic biryanis and sweet Shahi Tukda, every dish carries centuries
             of culinary heritage. The bustling lanes of Chowk and Aminabad are filled with tempting aromas that lure
             every visitor.            
            </p>
          </div>
        </div>

        {/* Row 3: Activities (Image Left) */}
        <div className="row about-row align-items-center mb-5">
          <div className="col-md-6">
            <img src="/assets/img/handicraft.jpg" alt="Activities" className="about-img img-fluid" />
          </div>
          <div className="col-md-6 px-lg-5">
            <h3 className="section-subtitle">Activities & Tours</h3>
            <p className="section-text">
             Lucknow offers a wide range of engaging activities for travelers of all ages. From heritage walks
             through old markets to serene evenings at the Gomti Riverfront, every experience reveals a new
             side of the city. Participate in chikankari workshops, attend cultural shows, or visit modern
             landmarks like Ambedkar Park and Husainabad Complex.            </p>
          </div>
        </div>

        {/* Row 4: History (Image Right) */}
        <div className="row about-row align-items-center mb-5 flex-md-row-reverse">
          <div className="col-md-6">
            <img src="/assets/img/imambara.jpg" alt="History" className="about-img img-fluid" />
          </div>
          <div className="col-md-6 px-lg-5">
            <h3 className="section-subtitle">Rich History</h3>
            <p className="section-text">
             Lucknow’s history is a fascinating tale of royalty, resilience, and refinement.
             Once ruled by the Nawabs of Awadh, the city became a center of Urdu poetry, literature, and culture.
             The 1857 uprising marked a significant chapter, with monuments like the Residency
             still standing as witnesses of courage.            </p>
          </div>
        </div>

        {/* Row 5: Cuisine (Image Left) */}
        <div className="row about-row align-items-center mb-5">
          <div className="col-md-6">
            <img src="/assets/img/tkababi.jpg" alt="Delicious cuisine" className="about-img img-fluid" />
          </div>
          <div className="col-md-6 px-lg-5">
            <h3 className="section-subtitle">Delicious Cuisine</h3>
            <p className="section-text">
             The culinary culture of Lucknow reflects grace, patience, and perfection. 
             The Awadhi chefs mastered slow-cooking methods that bring out rich flavors and tenderness in every bite.
             From morning kulhad chai to sizzling evening kebabs, the food scene is a delightful mix of heritage and creativity.
            </p>
          </div>
        </div>
         {/* Row 6: Culture (Image right) */}
        <div className="row about-row align-items-center mb-5">
            <div className="col-md-6 px-lg-5">
            <h3 className="section-subtitle">Cultural Experience</h3>
            <p className="section-text">
            Lucknow’s culture is built upon elegance, respect, and artistry — known as its famous ‘Tehzeeb’.
            The city is home to classical kathak dancers, soulful ghazal nights, and intricate handicrafts like chikankari and zardozi.
            Every festival is celebrated with unity and grace, reflecting the true spirit of India.
            </p>
          </div>
           <div className="col-md-6">
            <img src="/assets/img/kathak.jpg" alt="Culture" className="about-img img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;