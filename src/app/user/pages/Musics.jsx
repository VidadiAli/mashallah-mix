import React, { useEffect, useState } from 'react';
import MusicCard from './MusicCard';
import '../css/User.css'
import api from '../../../scripts/api';
import { language } from '../../../scripts/language';
import Pagination from '../../admin/pages/Pagination';
import MusicsLoading from '../../loadings/MusicsLoading';
import Loading from '../../loadings/Loading';
import { FiRefreshCw } from "react-icons/fi";
import { listen } from '../../../scripts/controller';
import { FaBars, FaMusic } from 'react-icons/fa';

const Musics = ({
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
  setShowArtistsBox,
  playListPages,
  innerWidth
}) => {
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false)
  const pageSize = 2;

  const callDummy = async (isFirst) => {
    try {
      isFirst ? setLoading(true) : setPageLoading(true)
      const res = await api.get('/user/getMusics', {
        params: { page, pageSize }
      });

      setDummyData(prev => [
        ...prev,
        ...(res?.data?.data || [])
      ]);

      setPlayList(prev => [
        ...prev,
        ...(res?.data?.data || [])
      ]);

      setTotalPages(res?.data?.totalPages || 1);

      if (page !== 1) {
        listen(currentMusic, setCurrentMusic, setDuration, id, setId, setSeconds, seconds, audioRef, currentMusicRef, intervalRef, setPlayingId, setPlaying, [...playList, ...res?.data?.data]);
      }

    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
      setPageLoading(false)
    }
  }

  useEffect(() => {
    if (localStorage.getItem('selectedPlayList')) {
      if (JSON.parse(localStorage.getItem('selectedPlayList'))) {
        localStorage.removeItem('selectedPlayList');
        return;
      }
    };

    if (!
      (
        window.location.href.includes('/likeds')
        ||
        window.location.href.includes('/artists')
      )
    ) callDummy(page === 1);

    if (window.location.href.includes('/artists')) setShowArtistsBox('artists');

    if (window.location.href.includes('/my-lists')) setShowArtistsBox('my-lists')

  }, [page, window.location.href]);



  const callPlayList = async (artist) => {
    try {
      const res = await api.get(`/user/getArtistMusics/${artist}`,
        {
          params: {
            page: playListPages?.page,
            pageSize: playListPages?.pageSize
          }
        });

      const newPlayList = res?.data?.data || [];
      playListPages?.setTotalPages(res?.data?.totalPages || 1);

      setPlayList(prev => [...prev, ...newPlayList]);
      setDummyData(prev => [...prev, ...newPlayList]);
      listen(currentMusic, setCurrentMusic, setDuration, id, setId, setSeconds, seconds, audioRef, currentMusicRef, intervalRef, setPlayingId, setPlaying, [...playList, ...newPlayList]);

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (
      playListPages?.page !== 1
      && playListPages?.currentPlayList !== ''
      && !window.location.href.includes('/likeds')
      && playListPages?.currentPlayList !== 'likeds'
    ) callPlayList(currentMusic?.artist);
  }, [playListPages?.page]);


  const changePlayList = () => {
    setCurrentMusic(playList[0]);
    listen(playList[0], setCurrentMusic, setDuration, id, setId, setSeconds, seconds, audioRef, currentMusicRef, intervalRef, setPlayingId, setPlaying, playList);
  };

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

    <div className="musics">
      {
        loading ? <MusicsLoading /> :
          <>

            <div className='sticky-element'>
              <div className={`sticky-element-child 
                ${!window.location.href.includes('/likeds') &&
                !window.location.href.includes('/artists') &&
                !window.location.href.includes('/my-lists') &&
                'child-for-music'}
                `}>
                {
                  innerWidth < 1000 && <button className='menu-bar' onClick={moveMenu}>
                    <FaBars className='menu-bar-icon' />
                  </button>
                }
                {
                  window.location.href.includes('/likeds') ?
                    <div className='section-main-head' style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <div className="section-header" >
                        <h2>{language?.[lang].user.likeds.head}</h2>
                      </div>

                      {
                        dummyData?.length > 0 && <button onClick={changePlayList} className='current-playlist'
                          style={{ width: 'min-content', whiteSpace: 'nowrap', borderRadius: '10px', padding: '10px' }}>
                          {language?.[lang].currentPlayList}
                        </button>
                      }
                    </div>
                    :
                    <div className='section-main-head'>
                      <div className="section-header">
                        <h2>{language?.[lang].user.main.head}</h2>
                        <p>{language?.[lang].user.main.headSpan}</p>
                      </div>

                      <button onClick={() => {
                        setDummyData([]);
                        setPlayList([]);
                        callDummy(page === 1);
                        playListPages.setCurrentPlayList('');
                      }} className='refresh-btn'>
                        <FiRefreshCw />
                      </button>
                    </div>
                }
              </div>
              {
                innerWidth < 750 && currentMusic && <button className='menu-bar' onClick={moveArtist}>
                  <FaBars className='menu-bar-icon' />
                </button>
              }
            </div>

            {
              dummyData?.length === 0 ? <div className="playlist-empty">

                <FaMusic />

                <h3>
                  {
                    language?.[lang]?.playList?.noPlaylistsTitle
                  }
                </h3>

                <p>
                  {
                    language?.[lang]?.playList?.noPlaylistsText
                  }
                </p>

              </div>
                :
                <div className="music-grid">
                  {
                    dummyData.map(item => (
                      <MusicCard
                        key={item._id}
                        lang={lang}
                        setCurrentMusic={setCurrentMusic}
                        currentMusic={currentMusic}
                        music={item}
                        playing={playing}
                        setPlaying={setPlaying}
                        intervalRef={intervalRef}
                        audioRef={audioRef}
                        currentMusicRef={currentMusicRef}
                        duration={duration}
                        setDuration={setDuration}
                        id={id} setId={setId}
                        seconds={seconds}
                        setSeconds={setSeconds}
                        playingId={playingId}
                        setPlayingId={setPlayingId}
                        playList={playList}
                        setPlayList={setPlayList}
                      />
                    ))
                  }
                </div>
            }

            {
              page < totalPages && playListPages?.currentPlayList === '' && (
                <div className='more-box'>
                  <button
                    className='more'
                    onClick={() => setPage(prev => prev + 1)}
                  >
                    {language?.[lang].more}
                  </button>
                </div>
              )
            }
            {
              pageLoading && <Loading />
            }


            {
              playListPages?.page < playListPages?.totalPages
              &&
              playListPages?.currentPlayList !== ''
              &&
              playListPages?.currentPlayList !== 'likeds'
              && (
                <div className='more-box'>
                  <button
                    className='more'
                    onClick={() => { playListPages?.setPage(prev => prev + 1) }}
                  >
                    {language?.[lang].more}
                  </button>
                </div>
              )
            }
            {
              pageLoading && <Loading />
            }
          </>
      }

    </div>
  );
};

export default Musics;