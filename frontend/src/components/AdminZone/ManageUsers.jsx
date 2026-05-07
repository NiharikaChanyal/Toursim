import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from'axios';
import { toast } from 'react-toastify';
import './ManageUsers.css';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const fetchUsers = () => {
        axios.get("https://city-tourism-booking-guide.onrender.com/api/users/all-users")
            .then(res => setUsers(res.data))
            .catch(err => console.log("Error fetching users", err));
    };

    useEffect(() => {
        fetchUsers(); // Data fetch as component loads
    }, []);    
    
    const handleDelete = async (id) => {
        if (window.confirm("Do you really wanted to remove User?")) {
            try {
                await axios.delete(`https://city-tourism-booking-guide.onrender.com/api/users/delete/${id}`);
                toast.success("User deleted!");
                fetchUsers(); // Table refresh 
            } catch (err) {
                toast.error("Deletion failed!");
            }
        }
    };   

    return (
        <div className="admin-content container py-4"  >
            <h2 className="text-center">Registered Users List</h2>
            <div className="row justify-content-center">
            <div className="table-responsive shadow-sm p-3" >
                <table className="table table-light table-striped table-hover"  >
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Address</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.mobile || "N/A"}</td>
                                <td>{user.address || "N/A"}</td>
                                <td>
                                    <span className={`badge ${user.role === 'ADMIN' ? 'bg-dark' : 'bg-info'}`}>{user.role}</span>
                                </td>
                                <td className='text-nowrap'>
                                    <button className="btn btn-sm btn-outline-primary me-2"  onClick={() => navigate(`/admin/edit/${user.id}`, { state: { userData: user } })} >
                                    <i className="fa fa-pencil"></i> Edit</button>
                                    <button  className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(user.id)}>
                                    <i className="fa fa-trash"></i> Delete </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          <div><button className="back-to-dash"  onClick={() => navigate('/admin/dashboard')}>
                <i className="fa fa-chevron-left"></i> Dashboard
            </button></div>
        </div>
        </div>
    );
};

export default ManageUsers;