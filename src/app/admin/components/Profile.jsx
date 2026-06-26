import { useEffect, useState } from "react";
import api from "../../../scripts/api";
import "./Profile.css";
import { Link } from "react-router-dom";
import {
    FaUser,
    FaSignature,
    FaIdCard,
    FaUserTag,
    FaLock
} from "react-icons/fa";
import ProfileLoading from "../../loadings/ProfileLoading";

const Profile = () => {

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState({
        type: "",
        text: ""
    });

    const [profile, setProfile] = useState({
        name: "",
        surname: "",
        fatherName: "",
        username: ""
    });

    useEffect(() => {

        const getMe = async () => {

            try {

                setLoading(true)
                const { data } = await api.get(
                    "/admin/getMe"
                );

                setProfile({
                    name: data.data.name || "",
                    surname: data.data.surname || "",
                    fatherName: data.data.fatherName || "",
                    username: data.data.username || ""
                });

            } catch (error) {
                console.log(error);
            }
            finally{
                setLoading(false)
            }

        };

        getMe();

    }, []);

    const handleProfileChange = (e) => {

        const { name, value } = e.target;

        setProfile(prev => ({
            ...prev,
            [name]: value
        }));

    };

    const updateProfile = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            setMessage({
                type: "",
                text: ""
            });

            const { data } = await api.patch(
                "/admin/update-me",
                profile
            );

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
        loading ? <ProfileLoading /> :
            <section className="profile-page">

                <div className="background-grid"></div>

                <div className="floating-circle circle-1"></div>
                <div className="floating-circle circle-2"></div>

                <div className="profile-card">

                    <div className="profile-header">

                        <div className="profile-icon">
                            <FaUser />
                        </div>

                        <h1>Profile Settings</h1>

                        <p>
                            Manage your account information
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
                        onSubmit={updateProfile}
                    >

                        <div className="input-group">
                            <FaSignature className="input-icon" />

                            <input
                                name="name"
                                value={profile.name}
                                onChange={handleProfileChange}
                                placeholder="Name"
                            />
                        </div>

                        <div className="input-group">
                            <FaSignature className="input-icon" />

                            <input
                                name="surname"
                                value={profile.surname}
                                onChange={handleProfileChange}
                                placeholder="Surname"
                            />
                        </div>

                        <div className="input-group">
                            <FaIdCard className="input-icon" />

                            <input
                                name="fatherName"
                                value={profile.fatherName}
                                onChange={handleProfileChange}
                                placeholder="Father Name"
                            />
                        </div>

                        <div className="input-group">
                            <FaUserTag className="input-icon" />

                            <input
                                name="username"
                                value={profile.username}
                                onChange={handleProfileChange}
                                placeholder="Username"
                            />
                        </div>

                        <div className="profile-actions">

                            <button
                                type="submit"
                                className="submit-btn"
                                disabled={loading}
                            >
                                {
                                    loading
                                        ? "Saving..."
                                        : "Save Profile"
                                }
                            </button>

                            <Link
                                to="/admin/changePassword"
                                className="password-link"
                            >
                                <FaLock />
                                Change Password
                            </Link>

                        </div>

                    </form>

                </div>

            </section>
    );
};

export default Profile;