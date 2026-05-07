import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Packages.css';

const Packages = () => {
    const navigate = useNavigate();
    const [packages, setPackages] = useState([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const res = await axios.get("https://city-tourism-booking-guide.onrender.com/api/packages/all");
                setPackages(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching packages", err);
                setLoading(false);
            }
        };
        fetchPackages();
    }, []);

    const handleAddToCart = async (pkg) => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            toast.error("Please login first!");
            navigate("/login");
            return;
        }

        const cartItem = {
            userId: user.id,
            packId: pkg.id,
            packName: pkg.packName, // Backend variable name matching
            price: pkg.price,
            imageUrl: pkg.imageUrl
        };

        try {
            const response = await axios.post("https://city-tourism-booking-guide.onrender.com/api/cart/add", cartItem);
            toast.success("Added to Cart! 🛒");
        } catch (error) {
            toast.error("Connection failed!");
        }
    };

    const handleAddToWishlist = async (pkg) => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            toast.error("Please Login First!");
            navigate('/login');
            return;
        }

        const wishItem = {
            userId: user.id,
            packId: pkg.id,
            packName: pkg.packName,
            price: pkg.price,
            imageUrl : pkg.imageUrl
        };

        try {
            await axios.post("https://city-tourism-booking-guide.onrender.com/api/wishlist/add", wishItem);
            toast.success("Added to Wishlist! ❤️");
        } catch (err) {
            toast.error("Error in adding!");
        }
    };

    return (
        <div className="packages-container">
            <div className="packages-header">
                <h1>Discover the Soul of Lucknow</h1>
                <p>Curated heritage tours and experiences just for you.</p>
            </div>

            {loading ? (
                <div className="text-center mt-5"><h4>Loading amazing deals...</h4></div>
            ) : (
                <div className="packages-grid">
                    {packages.map((pkg) => (
                        <div className="pkg-card" key={pkg.id}>
                            <div className="pkg-image-wrapper">
                                <img src={pkg.imageUrl || '/assets/img/default.jpg'} alt={pkg.packName} />
                                <span className="pkg-badge">New</span>
                                <button className="wishlist-overlay" onClick={() => handleAddToWishlist(pkg)}>
                                    <i className="fa fa-heart"></i>
                                </button>
                            </div>
                            <div className="pkg-content">
                                <h3 className="pkg-title">{pkg.packName}</h3>
                                <p className="pkg-desc">{pkg.description}</p>
                                <div className="pkg-meta">
                                    <span className="pkg-price">₹{pkg.price}</span>
                                    <span className="pkg-duration"><i className="fa fa-clock-o"></i> {pkg.duration || 'Full Day'} day</span>
                                </div>
                                <div className="pkg-actions">
                                    <button className="btn-book-now" onClick={() => handleAddToCart(pkg)}>
                                        <i className="fa fa-shopping-cart"></i> Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <button className="back-to-dash"  onClick={() => navigate('/userdash')}>
                <i className="fa fa-chevron-left"></i> Dashboard
            </button>
        </div>
    );
};

export default Packages;
