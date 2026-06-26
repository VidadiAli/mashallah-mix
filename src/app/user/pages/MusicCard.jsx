import React, { useEffect, useRef, useState } from 'react';
import { FaPlay, FaPause, FaHeart, FaYoutube } from 'react-icons/fa';
import '../css/User.css'
import { listen, stopListen } from '../../../scripts/controller';
import { FiDownload } from 'react-icons/fi';

const MusicCard = ({
    lang,
    music,
    setCurrentMusic,
    currentMusic,
    playing,
    setPlaying,
    intervalRef,
    audioRef,
    currentMusicRef,
    duration,
    setDuration,
    id, setId,
    seconds,
    setSeconds,
    playingId,
    setPlayingId,
    playList,
    setPlayList
}) => {

    const [likeds, setLikeds] = useState([]);
    const [localChangeAlert, setLocalChangeAlert] = useState(0);

    const changeMusic = () => {
        setCurrentMusic(music);
        if (music?._id !== currentMusic?._id) {
            setPlaying(true);
            listen(music, setCurrentMusic, setDuration, id, setId, setSeconds, seconds, audioRef, currentMusicRef, intervalRef, setPlayingId, setPlaying, playList);
            return;
        }
        else {
            setPlaying(!playing);
        }

        if (!playing) {
            listen(music, setCurrentMusic, setDuration, id, setId, setSeconds, seconds, audioRef, currentMusicRef, intervalRef, setPlayingId, setPlaying, playList)
        }

        else {
            stopListen(audioRef, intervalRef, setPlayingId)
        }
    };


    const addLike = () => {
        const likedsMusics = localStorage.getItem('likedsMusics') ?
            JSON.parse(localStorage.getItem('likedsMusics')) : [];

        if (!likedsMusics.includes(music)) {
            likedsMusics.push(music);
            localStorage.setItem('likedsMusics', JSON.stringify(likedsMusics));
            setLikeds(likedsMusics)
            setLocalChangeAlert(prev => prev + 1)
        }
    }

    const removeLike = () => {
        const likedsMusics = localStorage.getItem('likedsMusics') ?
            JSON.parse(localStorage.getItem('likedsMusics')) : [];
        const newLikeds = likedsMusics.filter(e => e._id !== music?._id);
        localStorage.setItem('likedsMusics', JSON.stringify(newLikeds));
        setLikeds(likedsMusics)
        setLocalChangeAlert(prev => prev + 1)
    }

    useEffect(() => {
        const likedsMusics = localStorage.getItem('likedsMusics') ?
            JSON.parse(localStorage.getItem('likedsMusics')) : [];

        setLikeds(likedsMusics)
    }, [localChangeAlert])

    const downloadMusic = () => {
        if (!music) return;
        window.open(`https://mashallah-mix-back.onrender.com/api/user/downloadMusic/${music?._id}`, "_blank");
    };

    return (
        <div className="music-card-user">

            <div className="music-cover">
                {
                    likeds.some(
                        e => e._id === music._id
                    ) ?
                        <button className='heart-icon heart-icon-checked' onClick={removeLike}>
                            <FaHeart />
                        </button> :

                        <button className='heart-icon' onClick={addLike}>
                            <FaHeart />
                        </button>
                }

                {
                    music?.hasYoutubeLink && <a
                        href={music?.youtubeLink}
                        target="_blank"
                        rel="noreferrer"
                        className="music-youtube-link"
                    >
                        <FaYoutube />
                    </a>
                }
                <img
                    src={music.musicCover}
                    alt={music.name}
                />

                <button className="play-btn-user" onClick={changeMusic}>
                    {
                        currentMusic?._id === music?._id && playing ? <FaPause /> : <FaPlay />
                    }
                </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                <div className="music-details">
                    <h3>{music.name}</h3>
                    <p>{music.artist}</p>
                </div>
                <button className="volume-btn" onClick={downloadMusic} style={{ marginRight: '10px', marginTop: '13px' }}>
                    <FiDownload />
                </button>
            </div>
        </div>
    );
};

export default MusicCard;