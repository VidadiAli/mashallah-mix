import React, { useEffect, useState } from 'react'
import api from '../../../scripts/api';
import Pagination from '../../admin/pages/Pagination';
import '../css/Menu.css'
import { listen } from '../../../scripts/controller';
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { language } from '../../../scripts/language';

const AllArtists = ({
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

  const [artists, setArtists] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const pageSize = 30;

  const getArtists = async () => {
    try {
      const res = await api.get('/user/getArtists', {
        params: {
          page, pageSize
        }
      });

      setArtists(res?.data?.data || []);
      setTotalPages(res?.data?.totalPages || 1);
    } catch (error) {
      console.log(error)
    }
  };

  const navigate = useNavigate()

  const changePlayList = async (artist, fromClick) => {
    playListPages?.setCurrentPlayList(`${artist}`);
    try {
      const res = await api.get(`/user/getArtistMusics/${artist}`,
        {
          params: {
            page: fromClick ? 1 : playListPages?.page,
            pageSize: playListPages?.pageSize
          }
        });

      const newPlayList = res?.data?.data || [];
      playListPages?.setTotalPages(res?.data?.totalPages || 1);

      setShowArtistsBox(null)

      if (window.location.href.includes('/artists')) navigate('/');
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
        listen([...prev, ...newPlayList][0], setCurrentMusic, setDuration, id, setId, setSeconds, seconds, audioRef, currentMusicRef, intervalRef, setPlayingId, setPlaying, [...playList, ...newPlayList]);
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!window.location.href.includes('/artists')) {
      if (playListPages?.page && playListPages?.page !== 1) {
        changePlayList(currentMusic?.artist, false);
      }
    }
  }, [playListPages?.page]);

  useEffect(() => {
    getArtists();
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
            <h2>{language?.[lang]?.menu?.artists}</h2>
            <span>{artists.length} {lang === "eng" ? language?.[lang]?.menu?.artists : language?.[lang]?.artist?.Artist}</span>
          </div>
        </div>
        {
          innerWidth < 750 && currentMusic && <button className='menu-bar' onClick={moveArtist}>
            <FaBars className='menu-bar-icon' />
          </button>
        }
      </div>

      <div className="artists-grid">

        {
          artists.map((artist, index) => (
            <div
              key={index}
              className="artists-card"
              onClick={() => changePlayList(artist?._id, true)}
            >

              <div className="artists-avatar">
                {artist?._id[0]?.toUpperCase()}
              </div>

              <h3>{artist?._id}</h3>

              <p>{language?.[lang]?.artist?.Artist}</p>

            </div>
          ))
        }

      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

    </div>
  );

}

export default AllArtists