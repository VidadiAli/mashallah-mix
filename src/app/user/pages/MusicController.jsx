import React, { useEffect, useState } from "react";
import {
    FaPlay,
    FaPause,
    FaForward,
    FaBackward,
    FaVolumeUp,
    FaYoutube,
    FaPlusCircle
} from "react-icons/fa";
import { listen, nextMusic, previusMusic, stopListen } from "../../../scripts/controller";
import AddingToPlayList from "./AddingToPlayList";
import { FiDownload } from "react-icons/fi";

const MusicController = ({
    lang,
    setCurrentMusic,
    currentMusic,
    parentWidth,
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

    const [music, setMusic] = useState(null);
    const [showAdding, setShowAdding] = useState(null);

    useEffect(() => {
        if (currentMusic) {
            setMusic(currentMusic)
        }
    }, [currentMusic]);

    const stopMusic = () => {

        setPlaying(!playing);

        if (!playing) {
            listen(music, setCurrentMusic, setDuration, id, setId, setSeconds, seconds, audioRef, currentMusicRef, intervalRef, setPlayingId, setPlaying, playList);
        }
        else {
            stopListen(audioRef, intervalRef, setPlayingId);
        }
    };

    const forward = () => {
        nextMusic(music, setCurrentMusic, setDuration, id, setId, setSeconds, seconds, audioRef, currentMusicRef, intervalRef, setPlayingId, setPlaying, playList)
    };

    const backward = () => {
        previusMusic(music, setCurrentMusic, setDuration, id, setId, setSeconds, seconds, audioRef, currentMusicRef, intervalRef, setPlayingId, setPlaying, playList)
    };

    useEffect(() => {
        if (id) {
            const durationFront = document.getElementById(`${id}-1`);
            const element = document.getElementById(`${id}`);

            if (element && durationFront) {
                const durationBack = element.offsetWidth;
                const durationSeconds = Number(duration.split(":")[0]) * 60 + Number(duration.split(":")[1]);
                const faiz = (seconds / durationSeconds) * 100;
                durationFront.style.width = (faiz * durationBack) / 100 + 'px'
            }
        }
    }, [seconds, id, duration]);


    const downloadMusic = () => {
        if (!music) return;
        window.open(`https://mashallah-mix-back.onrender.com/api/user/downloadMusic/${music?._id}`, "_blank");
    };

    return (
        music &&
        <div
            className="music-controller"
            style={{
                width: `${parentWidth + 66}px`
            }}
        >

            <div className="controller-top">

                <div className="controller-left">

                    <img
                        src={music?.musicCover}
                        alt=""
                        className="controller-cover"
                    />

                    <div className="controller-info">

                        <h4>{music?.name}</h4>

                        <p>{music?.artist}</p>

                        <button
                            className="playlist-btn"
                            onClick={() => setShowAdding(true)}
                        >
                            <FaPlusCircle />
                        </button>

                    </div>

                </div>

                <div className="controller-buttons">

                    <button onClick={backward}>
                        <FaBackward />
                    </button>

                    <button
                        className="play-main-btn"
                        onClick={stopMusic}
                    >
                        {
                            playing
                                ? <FaPause />
                                : <FaPlay />
                        }
                    </button>

                    <button onClick={forward}>
                        <FaForward />
                    </button>

                </div>

                <div className="controller-right">

                    {
                        music?.hasYoutubeLink &&
                        <a
                            href={music?.youtubeLink}
                            target="_blank"
                            rel="noreferrer"
                            className="youtube-link"
                        >
                            <FaYoutube />
                        </a>
                    }

                    <button className="volume-btn" onClick={downloadMusic}>
                        <FiDownload />
                    </button>

                </div>

            </div>

            <div
                className="controller-progress"
                id={music?._id}
            >
                <div
                    className="controller-progress-fill"
                    id={`${music?._id}-1`}
                />
            </div>

            {
                showAdding &&
                <AddingToPlayList
                    setShowAdding={setShowAdding}
                    music={music}
                    lang={lang}
                />
            }

        </div>
    );
};

export default MusicController;