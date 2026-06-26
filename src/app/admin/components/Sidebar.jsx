import { Link } from "react-router-dom";
import {
    FaMusic,
    FaPlus,
    FaUser,
    FaChartBar
} from "react-icons/fa";

import './Sidebar.css'

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

            </nav>

        </aside>
    );
};

export default Sidebar;