import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import "./Login.css";
import api from "../../scripts/api";

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);

    const [payload, setPayload] = useState({
        username: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState({
        type: "",
        text: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setPayload((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            setLoading(true);
            if (!payload?.username?.trim() || !payload?.password?.trim()) {
                setMessage({
                    type: 'error',
                    text: 'İstifadəçi adı və ya parol boş qala bilməz'
                });
                return;
            }

            setMessage({
                type: "",
                text: ""
            });

            const { data } = await api.post(
                "/admin/login",
                payload
            );

            if (data?.data?.isChangePassword) {
                localStorage.setItem('role', data?.data?.role);
                window.location.href = '/admin'
            }
            else {
                window.location.href = '/admin/changePassword'
            }

            setMessage({
                type: "success",
                text: data.message
            });

        } catch (error) {

            setMessage({
                type: "error",
                text:
                    error.response?.data?.message ||
                    error.message
            });

        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="login">

            <div className="login-card">

                <div className="login-header">
                    <h1>Admin Login</h1>
                    <p>Sign in to continue</p>
                </div>

                <form onSubmit={handleSubmit}>

                    {
                        message.text &&
                        <div
                            className={`message ${message.type}`}
                        >
                            {message.text}
                        </div>
                    }

                    <div className="form-group">

                        <label>
                            Username
                        </label>

                        <input
                            type="text"
                            name="username"
                            value={payload.username}
                            onChange={handleChange}
                            placeholder="Enter username"
                            autoComplete="username"
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Password
                        </label>

                        <div className="password-wrapper">

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                name="password"
                                value={payload.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                autoComplete="current-password"
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword(prev => !prev)
                                }
                            >
                                {
                                    showPassword
                                        ? <FaEyeSlash />
                                        : <FaEye />
                                }
                            </button>

                        </div>

                    </div>

                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={loading}
                    >
                        {
                            loading
                                ? "Loading..."
                                : "Login"
                        }
                    </button>

                </form>

            </div>

        </section>
    );
};

export default Login;