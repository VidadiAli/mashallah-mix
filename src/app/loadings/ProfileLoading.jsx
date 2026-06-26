import "./ProfileLoading.css";

const ProfileLoading = () => {
    return (
        <div className="profile-loading">

            <div className="profile-loading-card">

                <div className="profile-loading-avatar skeleton"></div>

                <div className="profile-loading-title skeleton"></div>

                <div className="profile-loading-subtitle skeleton"></div>

                <div className="profile-loading-form">

                    <div className="profile-loading-input skeleton"></div>

                    <div className="profile-loading-input skeleton"></div>

                    <div className="profile-loading-input skeleton"></div>

                    <div className="profile-loading-input skeleton"></div>

                    <div className="profile-loading-actions">

                        <div className="profile-loading-btn skeleton"></div>

                        <div className="profile-loading-btn skeleton"></div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ProfileLoading;