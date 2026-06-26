import "./MusicAddingLoading.css";
import { FaMusic } from "react-icons/fa";

const MusicAddingLoading = () => {
    return (
        <div className="music-adding-loading">

            <div className="music-loading-card">

                <div className="music-loading-icon">
                    <FaMusic />
                </div>

                <h2>Uploading Music</h2>

                <p>
                    Please wait while your files are being uploaded...
                </p>

                <div className="loading-bar">
                    <div className="loading-bar-fill"></div>
                </div>

            </div>

        </div>
    );
};

export default MusicAddingLoading;