import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./Admin.css";
import { useEffect } from "react";

const Admin = () => {
    const checkLocal = () => {
        if (!localStorage.getItem('role')) {
            window.location.href = '/login-admin'
            return;
        }
    }
    useEffect(() => {
        checkLocal()
    }, [window.location])
    return (
        <div className="admin-layout">

            <Sidebar />

            <main className="admin-content">
                <Outlet />
            </main>

        </div>
    );
};

export default Admin;