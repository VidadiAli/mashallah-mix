import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./CreateAdmin.css";
import api from "../../scripts/api";

const CreateAdmin = () => {

    const [payload, setPoylaod] = useState({
        name: '',
        surname: '',
        fatherName: '',
        username: '',
        email: '',
        super_admin_username: '',
        super_admin_password: '',
        password: ''
    });

    const [err, setErr] = useState({
        name: '',
        surname: '',
        fatherName: '',
        username: '',
        email: '',
        super_admin_username: '',
        super_admin_password: '',
        password: ''
    })

    const [showSuperPassword, setShowSuperPassword] = useState(false);
    const [showAdminPassword, setShowAdminPassword] = useState(false);

    const changeFields = (e) => {
        setErr((prev) => ({ ...prev, [name]: '' }));
        const { name, value } = e.target;
        setPoylaod((prev) => ({ ...prev, [name]: value }));
    }

    const submit = async (e) => {
        e.preventDefault();
        for (const [key, value] of Object.entries(payload)) {
            if (value?.trim() === '') {
                let msg = 'Bu sahə boş qala bilməz'
                setErr((err) => ({ ...err, [key]: msg }));
                return;
            }
            if (key.includes('password') && value.length < 8) {
                let msg = 'Ən azı 8 simvoldan ibarət olmalıdır'
                setErr((err) => ({ ...err, [key]: msg }));
                return;
            }
            if (key === 'email' && !value.includes('@')) {
                let msg = 'Email formatına uyğun olmalıdır'
                setErr((err) => ({ ...err, [key]: msg }));
                return;
            }
        }
        try {
            const res = await api.post('/admin/create-admin', payload)
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <section className="create-admin">

            <div className="create-admin-card">

                <div className="form-header">
                    <h2>Create Admin</h2>
                    <p>Create a new administrator account</p>
                </div>

                <form>

                    <div className="form-grid">

                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter name"
                                value={payload.name}
                                onChange={(e) => changeFields(e)}
                            />
                            {
                                err.name && <p className="err-msg">{err.name}</p>
                            }
                        </div>

                        <div className="form-group">
                            <label>Surname</label>
                            <input
                                type="text"
                                name="surname"
                                placeholder="Enter surname"
                                value={payload.surname}
                                onChange={(e) => changeFields(e)}
                            />
                            {
                                err.surname && <p className="err-msg">{err.surname}</p>
                            }
                        </div>

                        <div className="form-group">
                            <label>Father Name</label>
                            <input
                                type="text"
                                name="fatherName"
                                placeholder="Enter father name"
                                value={payload.fatherName}
                                onChange={(e) => changeFields(e)}
                            />
                            {
                                err.fatherName && <p className="err-msg">{err.fatherName}</p>
                            }
                        </div>

                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter username"
                                value={payload.username}
                                onChange={(e) => changeFields(e)}
                            />
                            {
                                err.username && <p className="err-msg">{err.username}</p>
                            }
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={payload.email}
                                onChange={(e) => changeFields(e)}
                            />
                            {
                                err.email && <p className="err-msg">{err.email}</p>
                            }
                        </div>

                        <div className="form-group">
                            <label>Super Admin Username</label>
                            <input
                                type="text"
                                name="super_admin_username"
                                placeholder="Enter super admin username"
                                value={payload.super_admin_username}
                                onChange={(e) => changeFields(e)}
                            />
                            {
                                err.super_admin_username && <p className="err-msg">{err.super_admin_username}</p>
                            }
                        </div>

                    </div>

                    <div className="password-section">

                        <div className="form-group">
                            <label>Super Admin Password</label>

                            <div className="password-wrapper">

                                <input
                                    type={
                                        showSuperPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="super_admin_password"
                                    placeholder="Enter super admin password"
                                    value={payload.super_admin_password}
                                    onChange={(e) => changeFields(e)}
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowSuperPassword(prev => !prev)
                                    }
                                >
                                    {
                                        showSuperPassword
                                            ? <FaEyeSlash />
                                            : <FaEye />
                                    }
                                </button>

                            </div>
                            {
                                err.super_admin_password && <p className="err-msg">{err.super_admin_password}</p>
                            }
                        </div>

                        <div className="form-group">
                            <label>Admin Password</label>

                            <div className="password-wrapper">

                                <input
                                    type={
                                        showAdminPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    placeholder="Enter admin password"
                                    value={payload.password}
                                    onChange={(e) => changeFields(e)}
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowAdminPassword(prev => !prev)
                                    }
                                >
                                    {
                                        showAdminPassword
                                            ? <FaEyeSlash />
                                            : <FaEye />
                                    }
                                </button>

                            </div>
                            {
                                err.password && <p className="err-msg">{err.password}</p>
                            }
                        </div>

                    </div>

                    <button
                        type="submit"
                        className="submit-btn"
                        onClick={submit}
                    >
                        Create Admin
                    </button>

                </form>

            </div >

        </section >
    );
};

export default CreateAdmin;