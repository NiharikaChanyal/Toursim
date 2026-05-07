import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Wishlist.css';

const Wishlist = () => {
    const navigate = useNavigate();
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if(user){
            axios.get(`https://city-tourism-booking-guide.onrender.com/api/wishlist/user/${user.id}`)
                .then(res => setWishlistItems(res.data))
                .catch(err => console.log(err));
        }
    },[]);

    // 2. Remove from Wishlist
    const handleRemove = async (id) => {
        try {
            await axios.delete(`https://city-tourism-booking-guide.onrender.com/api/wishlist/delete/${id}`);
            setWishlistItems(wishlistItems.filter(item => item.id !== id));
        } catch (err) {
            toast.error("Failed to Delete!");
        }
    };

    const handleMoveToCart = async (item) => {
        const user = JSON.parse(localStorage.getItem("user"));
        try {
            await axios.post("https://city-tourism-booking-guide.onrender.com/api/cart/add", {
                userId: user.id,
                packId: item.packId,
                imageUrl: item.imageUrl,
                packName: item.name || item.packName,
                price: item.price
            });
            await handleRemove(item.id);
            toast.success("Moved to Cart! 🛒");
        } catch (err) {
            toast.error("Error moving to cart");
        }
    };

   
    return (
        <div className="wishlist-page">
            <div className="container">
                <h2 className="wishlist-title text-center"> My Wishlist</h2>

                {wishlistItems.length > 0 ? (
                    <div className="wishlist-grid">
                        {wishlistItems.map(item => (
                            <div className="wishlist-card" key={item.id}>
                                <div className="wish-img-container">
                                    <img src={item.imageUrl} alt={item.packName} />
                                    <button className="wish-remove" onClick={() => handleRemove(item.id)}>
                                        <i className="fa fa-times"></i>
                                    </button>
                                </div>
                                <div className="wish-info">
                                    <h4>{item.packName}</h4>
                                    <p className="price">₹{item.price}</p>
                                    <button className="wish-btn" onClick={() => handleMoveToCart(item)}>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state text-center">
                        <i className="fa fa-heart-o fa-5x"></i>
                        <h3 className='text-muted'>Your wishlist is empty!</h3>
                        <button className="btn btn-browse btn-lg btn-outline-danger" onClick={() => navigate('/packages')}>Browse Packages</button>
                    </div>
                )}
            </div>

            <button className="back-btn-fixed" onClick={() => navigate('/userdash')}>
                <i className="fa fa-chevron-left"></i> Dashboard
            </button>
        </div>
    );
};

export default Wishlist;