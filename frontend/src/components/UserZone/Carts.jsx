import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Carts.css';

const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            axios.get(`https://city-tourism-booking-guide.onrender.com/api/cart/user/${user.id}`)
                .then(res => setCartItems(res.data))
                .catch(err => console.error("Error fetching cart:", err));
        } else {
            navigate('/login');
        }
    }, [navigate])

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

    // 2. Database se Item hatana
    const handleRemove = async (id) => {
        if (window.confirm("Are you sure wanted to remove it?")) {
            try {
                await axios.delete(`https://city-tourism-booking-guide.onrender.com/api/cart/delete/${id}`);
                setCartItems(cartItems.filter(item => item.id !== id));
            } catch (err) {
                toast.error("Item can't be deleted.Try after sometime");
            }
        }
    };

    // 3. Checkout Logic (Cart -> Booking)
    const handleCheckout = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        setIsProcessing(true);
        
        try {
            for (const item of cartItems) {
                const bookingData = {
                    userId: user.id,
                    packId: item.packId,
                    packName: item.packName,
                    userName: user.name,
                    imageUrl: item.imageUrl,
                    totalPrice: item.price,
                    status: "Pending",
                    bookingDate: new Date().toLocaleDateString('en-GB'),
                    persons: 1 // Default 1
                };
                console.log("Sending Data:", bookingData);
                await axios.post("https://city-tourism-booking-guide.onrender.com/api/bookings/place", bookingData);
                
                // Deletion from cart
                await axios.delete(`https://city-tourism-booking-guide.onrender.com/api/cart/delete/${item.id}`);
            }

            toast.success("Congratulations! Your Booking is Confirmed.");
            navigate('/confirm-booking');
        } catch (err) {
            toast.error("Booking failed!");
        } finally {
            setIsProcessing(false);
        }
    };   

    return (
        <div className="cart-page">
            <div className="container mt-5">
                <h2 className="cart-title text-center mb-4">
                    <i className="fa fa-shopping-cart text-primary"></i> My Shopping Cart
                </h2>
                
                <div className="cart-container shadow-sm p-4 bg-white rounded">
                    {cartItems.length > 0 ? (
                        <>
                            <div className="table-responsive">
                                <table className="table cart-table align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Package</th>
                                            <th>Details</th>
                                            <th>Price</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item) => (
                                            <tr key={item.id}>
                                                <td width="150">
                                                     <img src={item.imageUrl} alt={item.packName} 
                                                     className="cart-img rounded shadow-sm" style={{width: '120px', height: '80px', objectFit: 'cover'}}/>
                                                </td>
                                                <td>
                                                    <h6 className="mb-0">{item.packName}</h6>
                                                    <small className="text-muted">Unit Price: ₹{item.price}</small>
                                                </td>
                                                <td className="fw-bold text-success">₹{item.price}</td>
                                                <td>
                                                    <button className="btn btn-outline-danger btn-sm border-0" onClick={() => handleRemove(item.id)}>
                                                        <i className="fa fa-trash"></i> Remove
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="cart-summary mt-4 p-3 bg-light rounded text-end">
                                <h3 className="mb-3 text-secondary">Grand Total: <span className="text-dark">₹{totalPrice}</span></h3>
                                <button className="btn btn-checkout px-5 py-2 shadow-sm" style={{background: '#2c3e50',color:'white'}}
                        onClick={handleCheckout} disabled={isProcessing}>
                                    {isProcessing ? 'Processing...' : 'Confirm & Proceed to Pay'}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="empty-cart text-center py-5">
                            <i className="fa fa-shopping-basket fa-5x text-muted mb-3 opacity-25"></i>
                            <h3 className="text-muted">Oops! Your cart is empty</h3>
                            <p className="mb-4">Looks like you haven't added any tours to your bucket list yet.</p>
                            <button className="btn btn-outline-primary btn-lg px-4 py-2 rounded-pill" onClick={() => navigate('/packages')}>
                                <i className="fa fa-search"></i> Discover Packages
                            </button>
                        </div>
                    )}
                </div>

                {/* Fixed Back Button */}
                <button className="back-btn-fixed back-to-dash" onClick={() => navigate('/userdash')}>
                    <i className="fa fa-chevron-left"></i> Dashboard
                </button>
            </div>
        </div>
    );
};

export default Cart;