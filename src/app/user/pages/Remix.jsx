import React, { useEffect, useState } from 'react'
import api from '../../../scripts/api';
import Pagination from '../../admin/pages/Pagination';
import '../css/Menu.css'
import { listen } from '../../../scripts/controller';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaMusic } from 'react-icons/fa';
import { language } from '../../../scripts/language';
import MiniLoading from '../../loadings/MiniLoading';
import Loading from '../../loadings/Loading';

const Remix = ({
    lang,
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
    setPlayList,
    dummyData,
    setDummyData,
    showArtistsBox,
    setShowArtistsBox,
    playListPages
}) => {

    const [remixes, setRemixes] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(null);
    const pageSize = 15;

    const getRemixes = async () => {
        try {
            setLoading(true);
            const res = await api.get('/user/getRemixes');

            setRemixes(res?.data?.data || []);
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    };

    const navigate = useNavigate()

    const changePlayList = async (remix, fromClick) => {
        playListPages?.setCurrentPlayList(`${remix?.name}`);
        try {
            const res = await api.get(`/user/getRemixList/${remix?._id}`,
                {
                    params: {
                        page: fromClick ? 1 : playListPages?.page,
                        pageSize: playListPages?.pageSize
                    }
                });

            const newPlayList = res?.data?.data || [];
            playListPages?.setTotalPages(res?.data?.totalPages || 1);

            setShowArtistsBox(null)

            if (window.location.href.includes('/remix')) navigate('/');
            localStorage.setItem('selectedPlayList', JSON.stringify(true));

            if (fromClick) {
                setPlayList(newPlayList);
                setDummyData(newPlayList);
                setCurrentMusic(newPlayList[0]);
                listen(newPlayList[0], setCurrentMusic, setDuration, id, setId, setSeconds, seconds, audioRef, currentMusicRef, intervalRef, setPlayingId, setPlaying, newPlayList);
            }
            else {
                setPlayList(prev => [...prev, ...newPlayList]);
                setDummyData(prev => [...prev, ...newPlayList]);
                listen([...playList, ...newPlayList][0], setCurrentMusic, setDuration, id, setId, setSeconds, seconds, audioRef, currentMusicRef, intervalRef, setPlayingId, setPlaying, [...playList, ...newPlayList]);
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!window.location.href.includes('/remix')) {
            if (playListPages?.page && playListPages?.page !== 1) {
                changePlayList(currentMusic?.artist, false);
            }
        }
    }, [playListPages?.page]);

    useEffect(() => {
        getRemixes();
    }, [page]);


    const moveMenu = () => {
        const menu = document.querySelector('.menu');
        if (!menu) return;
        menu.classList.toggle('menu-move')
    }

    const moveArtist = () => {
        const artist = document.querySelector('.artist');
        if (!artist) return;
        artist.style.left = `calc(100% - ${artist.offsetWidth}px)`
    }

    return (
        <div className="artists-page">

            <div className='sticky-element'>
                <div className='sticky-element-child'>
                    {
                        innerWidth < 1000 && <button className='menu-bar' onClick={moveMenu}>
                            <FaBars className='menu-bar-icon' />
                        </button>
                    }
                    <div className="artists-header">
                        <h2>Remix</h2>
                    </div>
                </div>
                {
                    innerWidth < 750 && currentMusic && <button className='menu-bar' onClick={moveArtist}>
                        <FaMusic className='menu-bar-icon' />
                    </button>
                }
            </div>

            <div className="artists-grid">

                {
                    remixes.map((remix, index) => (
                        <div
                            key={index}
                            className="artists-card"
                            onClick={() => changePlayList(remix, true)}
                        >

                            <div className="artists-avatar">
                                {remix?.name[0]?.toUpperCase()}
                            </div>

                            <h3>{remix?.name}</h3>

                            {/* <p>{language?.[lang]?.artist?.Artist}</p> */}

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
                loading && <Loading />
            }
        </div>
    );

}

export default Remix