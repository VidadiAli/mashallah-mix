import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./Admin.css";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";

const Admin = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [innerWidth, setInnerWidth] = useState(window.innerWidth)

    const checkLocal = () => {
        if (!localStorage.getItem('role')) {
            window.location.href = '/login-admin'
            return;
        }
    }

    useEffect(() => {
        checkLocal()
    }, [window.location]);


    useEffect(() => {

        const handleResize = () => {
            setInnerWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };

    }, []);

    return (
        <div className="admin-layout">

            <Sidebar innerWidth={innerWidth} showMenu={showMenu} setShowMenu={setShowMenu} />

            <main className="admin-content">
                {
                    innerWidth <= 1000 && <button style={{
                        position: 'fixed',
                        zIndex: '10',
                        right: '20px',
                        top: '20px',
                        backgroundColor: 'var(--primary)',
                        color: 'ButtonFace',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: 'none',
                        outline: 'none',
                        borderRadius: '50%',
                        cursor: 'pointer'
                    }} onClick={() => setShowMenu(!showMenu)}>
                        <FaBars />
                    </button>
                }
                <Outlet />
            </main>

        </div>
    );
};

export default Admin;