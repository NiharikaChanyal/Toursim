import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './ManagePackages.css';

const ManagePackages = () => {
    const navigate = useNavigate();
    const [packages, setPackages] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const [newPkg, setNewPkg] = useState({
        packName: '',
        description: '',
        duration: '',
        price: '',
        imageUrl: ''
    });

    const fetchPackages = async () => {
        try {
            const res = await axios.get("https://city-tourism-booking-guide.onrender.com/api/packages/all");
            setPackages(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => { fetchPackages(); }, []);

    const handleChange = (e) => {
        setNewPkg({ ...newPkg, [e.target.name]: e.target.value });
    };

    const handleEdit = (pkg) => {
        setIsEditing(true);
        setCurrentId(pkg.id);
        setNewPkg(pkg);
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axios.put(`https://city-tourism-booking-guide.onrender.com/api/packages/update/${currentId}`, newPkg);
                toast.success("Updated Successfully");
            } else {
                await axios.post("https://city-tourism-booking-guide.onrender.com/api/packages/add", newPkg);
                toast.success("Added Successfully");
            }
            closeForm();
            fetchPackages();
        } catch (err) {
            toast.error("Error saving package");
        }
    };

    const closeForm = () => {
        setNewPkg({ packName: '', description: '', duration: '', price: '', imageUrl: '' });
        setShowForm(false);
        setIsEditing(false);
        setCurrentId(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this package?")) {
            try {
                await axios.delete(`https://city-tourism-booking-guide.onrender.com/api/packages/delete/${id}`);
                fetchPackages();
            } catch (err) {
                toast.error("Delete failed");
            }
        }
    };

    return (
        <div className="admin-container">

            <h2 className="text-center">Manage Tour Packages</h2>

            {/* FORM MODAL */}
            {showForm && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal card">
                        <div className={`card-header ${isEditing ? 'bg-warning' : 'bg-primary'} text-white`}>
                            <h4>{isEditing ? "Edit Package" : "Add Package"}</h4>
                        </div>

                        <form onSubmit={handleSubmit} className="p-3">
                            <input type="text" name="packName" placeholder="Package Name" className="form-control mb-2" value={newPkg.packName} onChange={handleChange} required />

                            <input type="text" name="duration" placeholder="Duration" className="form-control mb-2" value={newPkg.duration} onChange={handleChange} required />

                            <input type="text" name="price" placeholder="Price" className="form-control mb-2" value={newPkg.price} onChange={handleChange} required />

                            <input type="text" name="imageUrl" placeholder="Image URL" className="form-control mb-2" value={newPkg.imageUrl} onChange={handleChange} required />

                            <textarea name="description" placeholder="Description" className="form-control mb-3" value={newPkg.description} onChange={handleChange} required />

                             <div className="modal-actions d-flex justify-content-between">
                                <button type="submit" className={`btn ${isEditing ? 'btn-warning' : 'btn-success'} px-4`} btn-md>
                                    {isEditing ? "Update Package" : "Save Package"}
                                </button>
                                <button className="btn btn-danger btn-md px-4" onClick={closeForm}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/*  TABLE */}
            <div className="d-flex justify-content-center">
                <div className="admin-card card shadow-sm mt-4">

                    <table className="table w-100 table-hover table-striped text-center">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Duration</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {packages.length > 0 ? (
                                packages.map(pkg => (
                                    <tr key={pkg.id}>
                                        <td>#{pkg.id}</td>
                                        <td>{pkg.packName}</td>
                                        <td>{pkg.duration}</td>
                                        <td>₹{pkg.price}</td>
                                        <td>
                                         <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(pkg)}>
                                         <i className="fa fa-edit"></i> Update </button>
                                         <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(pkg.id)}>
                                        <i className="fa fa-trash"></i>Delete </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No Data</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
            </div>

            {/* BUTTONS */}
            <div className="text-center mt-4">
                <button className="btn btn-primary text-light mt-4" onClick={() => setShowForm(true)}>
                    <i className="fa fa-plus"></i> Add New Package
                </button>

                <button className="btn back-to-dash" onClick={() => navigate("/admin/dashboard")}>
                   <i className="fa fa-chevron-left"></i> Dashboard
                </button>
            </div>

        </div>
    );
};

export default ManagePackages;