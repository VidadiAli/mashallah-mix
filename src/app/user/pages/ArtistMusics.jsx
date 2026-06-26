import React, { useEffect, useState } from 'react'
import api from '../../../scripts/api'
import { language } from '../../../scripts/language'
import MiniLoading from '../../loadings/MiniLoading'
import { listen } from '../../../scripts/controller'
import { useNavigate } from 'react-router-dom'

const ArtistMusics = ({
  lang,
  setPlayList,
  setDummyData,
  currentMusic,
  setCurrentMusic,
  playList,
  duration,
  setDuration,
  id,
  setId,
  seconds,
  setSeconds,
  playingId,
  setPlayingId,
  intervalRef,
  audioRef,
  currentMusicRef,
  playing,
  setPlaying,
  setShowArtistsBox,
  playListPages
}) => {

  const [artistMusics, setArtistMusics] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);

  const getArtistMusics = async (pageValue, reset = false) => {
    try {

      setPageLoading(true);

      const res = await api.get(
        `/user/getArtistMusics/${currentMusic?.artist}`,
        {
          params: {
            page: pageValue,
            pageSize: playListPages?.pageSize
          }
        }
      );

      const newData = res?.data?.data || [];

      if (reset) {
        setArtistMusics(newData);
      } else {
        setArtistMusics(prev => [...prev, ...newData]);
      }

      playListPages?.setTotalPages(res?.data?.totalPages || 1);

    } catch (error) {
      console.log(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    if (!currentMusic?.artist) return;

    playListPages?.setPage(1);
    getArtistMusics(1, true);
  }, [currentMusic?.artist]);

  useEffect(() => {
    if (!currentMusic?.artist) return;
    if (playListPages?.page === 1) return;

    getArtistMusics(playListPages?.page, false);
  }, [playListPages?.page]);

  const navigate = useNavigate();

  const changePlayList = () => {
    playListPages?.setCurrentPlayList('artist');

    setShowArtistsBox(null)

    if (window.location.href.includes('/artists')) navigate('/');

    localStorage.setItem('selectedPlayList', JSON.stringify(true));

    setPlayList(artistMusics);
    setDummyData(artistMusics);
    setCurrentMusic(artistMusics[0]);
    listen(artistMusics[0], setCurrentMusic, setDuration, id, setId, setSeconds, seconds, audioRef, currentMusicRef, intervalRef, setPlayingId, setPlaying, playList);
  }

  return (
    <div className="artist-musics">

      <button onClick={changePlayList} className='current-playlist'>{language?.[lang].currentPlayList}</button>

      {artistMusics.map((music, index) => (
        <div className={`artist-music-item ${music?._id === currentMusic?._id && 'hover-style'}`} key={index}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src={music.musicCover}
              alt=""
              className="artist-music-cover"
            />

            <div className="artist-music-info">
              <h4>{music.name}</h4>
            </div>
          </div>

          <span style={{ color: 'white', fontSize: '12px' }}>
            {music.duration}
          </span>

        </div>
      ))}

      {
        playListPages?.page < playListPages?.totalPages && (
          <div className='more-box'>
            <button
              className='more'
              onClick={() => playListPages?.setPage(prev => prev + 1)}
            >
              {language?.[lang].more}
            </button>
          </div>
        )
      }

      {pageLoading && <MiniLoading />}

    </div>
  )
}

export default ArtistMusics