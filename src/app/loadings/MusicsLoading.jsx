import "./MusicsLoading.css";

const MusicsLoading = () => {
    return (
        <div className="musics-loading-page">

            <div className="loading-bg"></div>

            <div className="loading-header skeleton"></div>

            <div className="loading-grid">

                {
                    Array.from({ length: 8 }).map((_, index) => (
                        <div
                            key={index}
                            className="loading-card"
                        >
                            <div className="loading-top">
                                <div className="loading-image skeleton"></div>

                                <div className="loading-info">
                                    <div className="loading-title skeleton"></div>
                                    <div className="loading-subtitle skeleton"></div>
                                </div>
                            </div>

                            <div className="loading-bottom">
                                <div className="loading-play skeleton"></div>
                                <div className="loading-progress skeleton"></div>
                                <div className="loading-time skeleton"></div>
                            </div>
                        </div>
                    ))
                }

            </div>

        </div>
    );
};

export default MusicsLoading;