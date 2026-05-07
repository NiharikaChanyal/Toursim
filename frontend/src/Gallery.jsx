import React from 'react';
import './Gallery.css';

const Gallery = () => {
  const images = [
    { id: 1, src: '/assets/img/beautyl.jpg', title: 'Bada Imambara', category: 'Heritage' },
    { id: 2, src: '/assets/img/chota_imambara.jpg', title: 'Chota Imambara', category: 'Heritage' },
    { id: 3, src: '/assets/img/clocktower.jpg', title: 'Clock Tower', category: 'Monument' },
    { id: 4, src: '/assets/img/rumi2.jpg', title: 'Rumi Darwaza', category: 'Heritage' },
    { id: 5, src: '/assets/img/ambedkar.jpg', title: 'Ambedkar Park', category: 'Modern' },
    { id: 6, src: '/assets/img/imambara.jpg', title: 'Asfi Mosque', category: 'Heritage' },
    { id: 7, src: '/assets/img/palassio.jpg', title: 'Phoenix Palassio', category: 'Lifestyle' },
    { id: 8, src: '/assets/img/mahotsav.jpg', title: 'Lucknow Mahotsav', category: 'Culture' },
    { id: 9, src: '/assets/img/lulu.jpg', title: 'Lulu Mall', category: 'Lifestyle' },
    { id: 10, src: '/assets/img/mosque.jpg', title: 'Mosque', category: 'Heritage' },
  ];

  return (
    <div className="gallery-page">
      {/* Hero Header */}
      <header className="gallery-header"
      style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/assets/img/mahotsav.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}>
        <div className="header-content">
          <h1>Photo Gallery</h1>
          <p>Discover the iconic beauty of <span>Lucknow</span></p>
          <div className="header-line"></div>
        </div>
      </header>

      <section className="container gallery-container">
        <div className="section-title">
          <h2>Explore Iconic Destinations</h2>
          <p style={{fontWeight:'Lighter', fontStyle:'italic'}}>Beautiful sights that define the soul of the City of Nawabs.</p>
        </div>

        <div className="gallery-grid">
          {images.map((img) => (
            <div className="gallery-card" key={img.id}>
              <div className="image-wrapper">
                <img src={img.src} alt={img.title} />
                <div className="image-overlay">
                  <div className="overlay-text">
                    <span className="category">{img.category}</span>
                    <h3>{img.title}</h3>
                    <div className="zoom-icon"><i className="fa fa-search-plus"></i></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Gallery;