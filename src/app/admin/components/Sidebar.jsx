import { Link } from "react-router-dom";
import {
    FaMusic,
    FaPlus,
    FaUser,
    FaChartBar,
    FaHome,
    FaTimes
} from "react-icons/fa";

import './Sidebar.css'
import { FiLogOut } from "react-icons/fi";
import api from "../../../scripts/api";
import { useState } from "react";

const Sidebar = ({ innerWidth, showMenu, setShowMenu }) => {

    const [loading, setLoading] = useState(null);

    const logOut = async () => {
        try {
            setLoading(true)
            await api.post('/admin/logout');
        } catch (error) {
            console.log(error)
        }
        finally {
            localStorage.removeItem('role');
            window.location.reload();
            setLoading(false)
        }
    };


    return (
        <aside className={`sidebar ${showMenu && 'sidebar-move'}`}>
            {
                innerWidth <= 1000 && <button style={{
                    position: 'fixed',
                    right: '20px',
                    top: '20px',
                    backgroundColor: 'var(--primary)',
                    color: 'var(--gold)',
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
                    <FaTimes />
                </button>
            }


            <h2>Music Admin</h2>

            <nav>
                <Link to="/">
                    <FaHome />
                    Main Page
                </Link>

                <Link to="" onClick={() => setShowMenu(false)}>
                    <FaMusic />
                    Musics
                </Link>

                <Link to="add-music" onClick={() => setShowMenu(false)}>
                    <FaPlus />
                    Add Music
                </Link>

                <Link to="profile" onClick={() => setShowMenu(false)}>
                    <FaUser />
                    Profile
                </Link>

                <Link onClick={logOut}>
                    <FiLogOut />
                    {
                        loading ? 'Logouting...' : 'Logout'
                    }
                </Link>
            </nav>

        </aside>
    );
};

export default Sidebar;