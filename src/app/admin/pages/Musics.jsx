import { useEffect, useRef, useState } from "react";
import api from "../../../scripts/api";
import Pagination from "./Pagination";
import "./Musics.css"

import { FaPlay, FaYoutube, FaEdit, FaTrashAlt } from "react-icons/fa";

import { FaCirclePause } from "react-icons/fa6";
import MusicsLoading from "../../loadings/MusicsLoading";
import AddMusic from "../components/AddMusic";
import Alert from "../../alert/Alert";


const Musics = () => {

    const [musics, setMusics] = useState([]);
    const [seconds, setSeconds] = useState(0);
    const [playingId, setPlayingId] = useState(null);
    const [id, setId] = useState(null);
    const [loading, setLoading] = useState(false)
    const [edit, setEdit] = useState(null);
    const [item, setItem] = useState(null)

    const pageSize = 30;
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [duration, setDuration] = useState(0);
    const [alert, setAlert] = useState({
        type: '',
        response: '',
        isQuestion: ''
    });
    const [answer, setAnswer] = useState(null);
    const [showAlert, setShowAlert] = useState('')

    const intervalRef = useRef(null);
    const audioRef = useRef(null);
    const currentMusicRef = useRef(null);

    useEffect(() => {
        const getMusics = async () => {
            setLoading(true);
            const { data } = await api.get(
                `/user/getMusics`,
                {
                    params: {
                        page,
                        pageSize
                    }
                }
            );

            setMusics(data.data);
            setTotalPages(data.totalPages);
            setLoading(false);
        };

        getMusics();

    }, [page]);

    const countSeconds = () => {
        setSeconds((prev) => prev + 1)
    };

    const listen = (url, musicId, duration) => {
        setDuration(duration);
        setId(musicId)

        if (id !== musicId && id) {
            const durationFront = document.getElementById(`${id}-1`);
            console.log(durationFront)
            durationFront.style.width = '0px'
        }

        if (currentMusicRef.current !== musicId) {

            if (audioRef.current) {
                audioRef.current.pause();
            }

            clearInterval(intervalRef.current);

            audioRef.current = new Audio(url);
            currentMusicRef.current = musicId;

            setSeconds(0);
        }

        audioRef.current.play();

        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setSeconds(
                Math.floor(audioRef.current.currentTime)
            );
        }, 1000);

        setPlayingId(musicId);

        audioRef.current.onended = () => {
            clearInterval(intervalRef.current);

            currentMusicRef.current = null;

            setPlayingId(null);

            setSeconds(0);
        };
    };

    const stopListen = () => {

        if (!audioRef.current) return;

        audioRef.current.pause();

        clearInterval(intervalRef.current);

        setPlayingId(null)
    };

    const deleteMusic = (music) => {
        setAlert({
            type: 'warning',
            response: 'Bu parçanı silməyə əminsiz?',
            isQuestion: true
        });
        setItem(music);
        setShowAlert('show-alert')
    };


    useEffect(() => {
        const removeMusic = async () => {
            if (answer && item) {
                try {
                    setLoading(true)
                    const res = await api.delete(`/admin/delete-music/${item?._id}`);

                    setMusics(musics.filter(e => e._id !== res?.data?.data));

                    setAlert({
                        type: 'success',
                        response: 'Parça uğurla silindi',
                        isQuestion: false
                    });

                } catch (error) {
                    setAlert({
                        type: 'error',
                        response: error.response?.data?.message ||
                            error.message,
                        isQuestion: false
                    });
                }
                finally {
                    setLoading(false)
                }
            }
        }

        removeMusic()
    }, [answer])


    useEffect(() => {
        return () => {

            clearInterval(intervalRef.current);

            if (audioRef.current) {
                audioRef.current.pause();
            }

        };
    }, []);


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

    return (
        loading ? <MusicsLoading /> :
            <div className="musics-page">

                <h1>Musics</h1>

                <div className="music-list">
                    {
                        musics.map(music => (
                            <div
                                key={music._id}
                                className={`music-card ${playingId === music._id
                                    ? "music-card-active"
                                    : ""
                                    }`}
                            >
                                <div className="music-card-profile-back">
                                    <div className="music-card-profile">
                                        <img
                                            src={music.musicCover}
                                            alt={music.name}
                                        />

                                        <div className="music-info">
                                            <h3>{music.name}</h3>
                                            <p>{music.artist}</p>
                                            {
                                                music.hasYoutubeLink ? <a
                                                    href={music.youtubeLink}
                                                    target="_blank">
                                                    <FaYoutube />
                                                    <span style={{ color: 'white', fontSize: '12px' }}>
                                                        {music.listenCount} oxunub
                                                    </span>
                                                </a> :
                                                    <span style={{ color: 'white', fontSize: '12px' }}>
                                                        {music.listenCount} oxunub
                                                    </span>
                                            }

                                        </div>
                                    </div>


                                    <div className="music-actions">
                                        <button className="action-btn edit-btn" onClick={() => setEdit(music)}>
                                            <FaEdit />
                                        </button>

                                        <button className="action-btn delete-btn" onClick={() => deleteMusic(music)}>
                                            <FaTrashAlt />
                                        </button>
                                    </div>
                                </div>

                                <div className="play-btns">
                                    {
                                        playingId === music._id
                                            ? (

                                                <FaCirclePause
                                                    className="play-pause"
                                                    onClick={stopListen}
                                                />
                                            )
                                            : (
                                                <FaPlay
                                                    className="play-pause"
                                                    onClick={() =>
                                                        listen(
                                                            music.musicUrl,
                                                            music._id,
                                                            music.duration
                                                        )
                                                    }
                                                />
                                            )
                                    }
                                    <div className="duration-show-back" id={`${music._id}`}>
                                        <div className="duration-show-front" id={`${music._id}-1`}></div>
                                    </div>

                                    <span className="duration">{music.duration}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />

                {
                    edit && <AddMusic item={edit} setItem={setEdit} />
                }

                {
                    alert?.type && <Alert
                        type={alert.type}
                        response={alert.response}
                        isQuestion={alert.isQuestion}
                        setAnswer={setAnswer}
                        showAlert={showAlert}
                        setShowAlert={setShowAlert}
                    />
                }

            </div>
    );
};

export default Musics;