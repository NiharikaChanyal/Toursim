import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./Login.css";

const Login = () => {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const username = user.trim().toLowerCase();
        const password = pass.trim();

        // Dummy Admin Login
        if (username === "admin" && password === "admin123") {
            const dummyAdmin = {
                name: "Admin",
                email: "admin@local.com",
                role: "ADMIN"
            };

            localStorage.setItem(
                "user",
                JSON.stringify(dummyAdmin)
            );

            toast.success("Welcome Admin");

            setTimeout(() => {
                navigate("/admin/dashboard");
            }, 500);

            return;
        }

        setLoading(true);

        try {
            const res = await axios.post(
                "https://city-tourism-booking-guide.onrender.com/api/users/login",
                {
                    email: user,
                    password: pass
                }
            );

            if (res.data) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(res.data)
                );

                toast.success(
                    "Welcome, " + res.data.name
                );

                if (res.data.role === "ADMIN") {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/userdash");
                }
            }

        } catch (err) {
            toast.error(
                err.response?.data ||
                "Invalid Email or Password!"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-wrapper">

            {loading && (
                <div className="loader-overlay">
                    <div className="spinner"></div>

                    <p className="loader-text">
                        Connecting with the server...
                        Please keep patience
                    </p>
                </div>
            )}

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5 col-sm-10">

                        <div className="login-card">

                            <div className="text-center">
                                <h2 className="login-heading">
                                    Login
                                </h2>
                            </div>

                            <form onSubmit={handleLogin}>

                                <div className="form-group">
                                    <label htmlFor="us">
                                        Username or Email
                                    </label>

                                    <input
                                        id="us"
                                        type="text"
                                        className="form-control login-input"
                                        placeholder="Username"
                                        value={user}
                                        onChange={(e) =>
                                            setUser(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="pas">
                                        Password
                                    </label>

                                    <input
                                        id="pas"
                                        type="password"
                                        className="form-control login-input"
                                        placeholder="Password"
                                        value={pass}
                                        onChange={(e) =>
                                            setPass(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </div>

                                <div className="checkbox-area">
                                    <label>
                                        <input
                                            type="checkbox"
                                        />
                                        {" "}
                                        Remember Me
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-custom w-100"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Authenticating..."
                                        : "Login"}
                                </button>

                                <div className="text-center mt-3">
                                    <a
                                        href="#"
                                        className="forgot-link"
                                    >
                                        Forgot Password?
                                    </a>
                                </div>

                            </form>

                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;