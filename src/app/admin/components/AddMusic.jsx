import { useState } from "react";
import {
    FaMusic,
    FaImage,
    FaYoutube,
    FaCloudUploadAlt
} from "react-icons/fa";

import api from "../../../scripts/api";
import "./AddMusic.css";
import {
    uploadImage,
    uploadMusic
} from "../../../scripts/utilites";
import MusicAddingLoading from "../../loadings/MusicAddingLoading";
import { data } from "react-router-dom";
import { useEffect } from "react";

const AddMusic = ({ item = null, setItem = () => { return null; } }) => {

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({
        type: '',
        text: ''
    });

    const [pictureFile, setPictureFile] = useState(null)
    const [musicFile, setMusicFile] = useState(null)

    const [payload, setPayload] = useState({
        name: "",
        artist: "",
        duration: "",
        hasYoutubeLink: false,
        youtubeLink: "",
        musicCover: "",
        musicUrl: "",
        coverPublicId: "",
        musicPublicId: ""
    });


    useEffect(() => {
        if (item) {
            setPayload(item);
            setPictureFile({
                file: 0,
                name: item.name + ' - cover.png'
            });
            setMusicFile({
                file: 0,
                name: item.name + ' - music.mp3'
            });
        }
    }, [item])

    const handleChange = (e) => {

        setMessage({
            text: '',
            type: ''
        });

        const {
            name,
            value,
            type,
            checked
        } = e.target;

        setPayload(prev => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : value
        }));
    };

    const getAudioDuration = (file) => {

        return new Promise((resolve) => {

            const audio =
                document.createElement("audio");

            audio.preload = "metadata";

            audio.onloadedmetadata = () => {

                const totalSeconds =
                    Math.floor(audio.duration);

                const minutes =
                    Math.floor(totalSeconds / 60);

                const seconds =
                    totalSeconds % 60;

                resolve(
                    `${minutes}:${String(seconds).padStart(2, "0")}`
                );
            };

            audio.src =
                URL.createObjectURL(file);

        });

    };

    const handleCoverChange = async (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setPictureFile({
            file,
            name: file.name
        });

    };

    const handleMusicChange = async (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setLoading(true);

        try {

            const duration =
                await getAudioDuration(file);

            setPayload(prev => ({
                ...prev,
                duration,
            }));

            setMusicFile({
                file,
                name: file.name
            });

        } finally {
            setLoading(false);
        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            setLoading(true)
            let musicCover = null, musicUrl = null;
            if (item && pictureFile?.file !== 0) {
                musicCover =
                    await uploadImage(pictureFile?.file);
            }
            else if (item && pictureFile?.file === 0) {
                musicCover = {
                    url: item.musicCover,
                    publicId: item.coverPublicId
                }
            }
            else if (!item) {
                musicCover =
                    await uploadImage(pictureFile?.file);
            }


            if (item && musicFile?.file !== 0) {
                musicUrl =
                    await uploadMusic(musicFile?.file);
            }
            else if (item && musicFile?.file === 0) {
                musicUrl = {
                    url: item.musicUrl,
                    publicId: item.musicPublicId
                }
            }
            else if (!item) {
                musicUrl =
                    await uploadMusic(musicFile?.file);
            }


            if (!musicUrl) {
                setMessage({
                    type: "error",
                    text: 'Musiqi faylı seçin'
                });
                return;
            }

            if (!musicCover) {
                setMessage({
                    type: "error",
                    text: 'Cover seçin'
                });
                return;
            }

            const newPayload = {
                ...payload,
                musicCover: musicCover.url,
                coverPublicId: musicCover.publicId,
                musicUrl: musicUrl.url,
                musicPublicId: musicUrl.publicId
            };
            const res = item
                ? await api.patch(
                    `/admin/update-music/${item?._id}`,
                    newPayload
                )
                : await api.post(
                    `/admin/add-music`,
                    newPayload
                );

            if (item) {
                window.location.reload()
            };

            setItem(null);

            setPayload({
                name: "",
                artist: "",
                duration: "",
                hasYoutubeLink: false,
                youtubeLink: "",
                musicCover: "",
                musicUrl: "",
                musicPublicId: "",
                coverPublicId: ""
            });

            setMessage({
                type: "success",
                text: res.data?.message || 'Musiqi əlavə edildi'
            });

            setMusicFile(null);
            setPictureFile(null);

        } catch (error) {
            setMessage({
                type: "error",
                text: error.response?.data?.message ||
                    error.message
            });
        }
        finally {
            setLoading(false)
        }
    };

    return (
        <section className={`add-music-page ${item && 'edit-music-section'}`}>
            {
                loading ? <MusicAddingLoading /> :
                    <>
                        <div className="background-grid"></div>

                        <div className="floating-circle circle-1"></div>
                        <div className="floating-circle circle-2"></div>

                        <div className="add-music-card">

                            <div className="page-header">

                                <div className="header-icon">
                                    <FaMusic />
                                </div>

                                <h1>{item ? 'Update' : 'Add New'} Music</h1>

                                <p>
                                    Upload songs to your platform
                                </p>

                                {
                                    message?.text && <p className={`message ${message.type}`}>
                                        {message.text}
                                    </p>
                                }

                            </div>

                            <form
                                className="add-music-form"
                                onSubmit={handleSubmit}
                            >

                                <div className="input-group">
                                    <input
                                        name="name"
                                        value={payload.name}
                                        placeholder="Music Name"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="input-group">
                                    <input
                                        name="artist"
                                        value={payload.artist}
                                        placeholder="Artist Name"
                                        onChange={handleChange}
                                    />
                                </div>

                                <label className="upload-box">

                                    <FaImage />

                                    <span className="file-name">
                                        {
                                            pictureFile ? pictureFile.name : 'Upload Cover Image'
                                        }
                                    </span>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleCoverChange}
                                    />

                                </label>

                                <label className="upload-box">

                                    <FaCloudUploadAlt />

                                    <span className="file-name">
                                        {
                                            musicFile ? musicFile.name : 'Upload Music File'
                                        }
                                    </span>

                                    <input
                                        type="file"
                                        accept="audio/*"
                                        onChange={handleMusicChange}
                                    />

                                </label>

                                <div className="youtube-toggle">

                                    <label>

                                        <input
                                            type="checkbox"
                                            name="hasYoutubeLink"
                                            checked={
                                                payload.hasYoutubeLink
                                            }
                                            onChange={handleChange}
                                        />

                                        <FaYoutube />

                                        Youtube videosu var

                                    </label>

                                </div>

                                {
                                    payload.hasYoutubeLink &&

                                    <div className="input-group">

                                        <input
                                            name="youtubeLink"
                                            value={payload.youtubeLink}
                                            placeholder="Youtube URL"
                                            onChange={handleChange}
                                        />

                                    </div>
                                }

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', gridColumn: '2 span' }}>
                                    {
                                        payload.musicCover &&

                                        <div className="old-files-box">
                                            <h1 className="old-files-head">Mövcud fayllar</h1>
                                            <div className="old-media">
                                                <div className="cover-preview">
                                                    <img
                                                        className="old-image"
                                                        src={payload.musicCover}
                                                        alt="cover"
                                                    />
                                                </div>
                                                <div className="audio-preview">
                                                    <audio className="old-music" src={payload.musicUrl} controls></audio>
                                                </div>
                                            </div>
                                        </div>
                                    }

                                    <div style={{ display: 'flex', gap: '15px' }}>
                                        <button
                                            className="submit-btn"
                                            disabled={loading}
                                        >
                                            {
                                                loading
                                                    ? "Uploading..."
                                                    : item ? 'Update Music' : 'Add Music'
                                            }
                                        </button>

                                        {
                                            item && <button
                                                className="submit-btn"
                                                onClick={() => setItem(null)}>
                                                Cancel
                                            </button>
                                        }
                                    </div>
                                </div>

                            </form>

                        </div>

                    </>
            }

        </section>
    );
};

export default AddMusic;