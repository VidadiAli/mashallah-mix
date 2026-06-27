import { Link } from "react-router-dom";
import {
    FaMusic,
    FaPlus,
    FaUser,
    FaChartBar
} from "react-icons/fa";

import './Sidebar.css'
import { FiLogOut } from "react-icons/fi";

const Sidebar = () => {
    return (
        <aside className="sidebar">

            <h2>Music Admin</h2>

            <nav>

                <Link to="">
                    <FaMusic />
                    Musics
                </Link>

                <Link to="add-music">
                    <FaPlus />
                    Add Music
                </Link>

                <Link to="profile">
                    <FaUser />
                    Profile
                </Link>

                <Link onClick={() => { localStorage.removeItem('role'); window.location.reload() }}>
                    <FiLogOut />
                    Logout
                </Link>
            </nav>

        </aside>
    );
};

export default Sidebar;