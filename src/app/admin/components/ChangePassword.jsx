import React from "react";
import { useState } from "react";
import {
    FaLock,
    FaKey,
    FaEye,
    FaEyeSlash,
    FaMusic
} from "react-icons/fa";
import "./Profile.css";
import api from "../../../scripts/api";
import Loading from "../../loadings/Loading";

const ChangePassword = () => {

    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);

    const [message, setMessage] = useState({
        type: "",
        text: ""
    });

    const [loading, setLoading] = useState(false);

    const [passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword: ""
    });

    const handlePasswordChange = (e) => {

        const { name, value } = e.target;

        setPasswords(prev => ({
            ...prev,
            [name]: value
        }));

    };

    const changePassword = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            setMessage({
                type: "",
                text: ""
            });

            const { data } = await api.patch(
                "/admin/changePassword",
                passwords
            );

            localStorage.removeItem("role");

            setPasswords({
                oldPassword: "",
                newPassword: ""
            });

            setMessage({
                type: "success",
                text: data.message
            });

            setTimeout(() => {
                window.location.href = "/login-admin";
            }, 1200);

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
        <section className="profile-page">

            <div className="background-grid"></div>

            <div className="floating-circle circle-1"></div>
            <div className="floating-circle circle-2"></div>

            <div className="profile-card">

                <div className="profile-header">

                    <div className="profile-icon">
                        <FaMusic />
                    </div>

                    <h1>Security Center</h1>

                    <p>
                        Protect your music platform account
                    </p>

                </div>

                {
                    message.text &&
                    <div className={`message ${message.type}`}>
                        {message.text}
                    </div>
                }

                <form
                    className="profile-form"
                    onSubmit={changePassword}
                >

                    <div className="input-group">

                        <FaLock className="input-icon" />

                        <input
                            type={
                                showOld
                                    ? "text"
                                    : "password"
                            }
                            name="oldPassword"
                            value={passwords.oldPassword}
                            onChange={handlePasswordChange}
                            placeholder="Current Password"
                        />

                        <button
                            type="button"
                            className="eye-btn"
                            onClick={() =>
                                setShowOld(prev => !prev)
                            }
                        >
                            {
                                showOld
                                    ? <FaEyeSlash />
                                    : <FaEye />
                            }
                        </button>

                    </div>

                    <div className="input-group">

                        <FaKey className="input-icon" />

                        <input
                            type={
                                showNew
                                    ? "text"
                                    : "password"
                            }
                            name="newPassword"
                            value={passwords.newPassword}
                            onChange={handlePasswordChange}
                            placeholder="New Password"
                        />

                        <button
                            type="button"
                            className="eye-btn"
                            onClick={() =>
                                setShowNew(prev => !prev)
                            }
                        >
                            {
                                showNew
                                    ? <FaEyeSlash />
                                    : <FaEye />
                            }
                        </button>

                    </div>

                    <button
                        className="submit-btn"
                        disabled={loading}
                    >
                        {
                            loading
                                ? "Updating..."
                                : "Change Password"
                        }
                    </button>

                </form>

            </div>
            {
                loading && <Loading />
            }

        </section>
    );
};

export default ChangePassword;