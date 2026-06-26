import React, { useEffect, useState } from "react";
import {
  FaMusic,
  FaPlay,
  FaListUl,
  FaCompactDisc,
  FaBars
} from "react-icons/fa";
import { language } from "../../../scripts/language";
import { listen } from "../../../scripts/controller";

const MyPlayLists = ({
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

  const [playLists, setPlayLists] = useState([]);

  useEffect(() => {

    const storage =
      localStorage.getItem("myPlayLists");

    if (!storage) {
      setPlayLists([]);
      return;
    }

    try {
      const data = JSON.parse(storage);

      if (Array.isArray(data)) {
        setPlayLists(data);
      } else {
        setPlayLists([]);
      }

    } catch {
      setPlayLists([]);
    }

  }, []);


  const playThisList = (list) => {
    setCurrentMusic(list[0])
    listen(list[0], setCurrentMusic, setDuration, id, setId, setSeconds, seconds, audioRef, currentMusicRef, intervalRef, setPlayingId, setPlaying, list);
  }

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

    <div className="my-playlists">
      <div className='sticky-element'>
        <div className="sticky-element-child">
          {
            innerWidth < 1000 && <button className='menu-bar' onClick={moveMenu}>
              <FaBars className='menu-bar-icon' />
            </button>
          }
          <div className="section-header">

            <h2>
              <FaCompactDisc />
              {
                language?.[lang]?.playList?.playListsHead
              }
            </h2>

            <p>
              {
                language?.[lang]?.playList?.playListsText
              }
            </p>

          </div>
        </div>

        {
          innerWidth < 750 && currentMusic && <button className='menu-bar' onClick={moveArtist}>
            <FaBars className='menu-bar-icon' />
          </button>
        }
      </div>

      {
        playLists.length === 0 ?

          <div className="playlist-empty">

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

          <div className="playlist-grid">

            {
              playLists.map((playlist, index) => {

                const cover =
                  playlist.list?.[0]?.musicCover;

                return (

                  <div
                    className="playlist-card"
                    key={index}
                  >

                    <div className="playlist-cover">

                      {
                        cover ?

                          <img
                            src={cover}
                            alt=""
                          />

                          :

                          <FaMusic className="cover-icon" />
                      }

                      <button
                        className="playlist-play"
                        onClick={() => playThisList(playlist?.list)}
                      >
                        <FaPlay />
                      </button>

                    </div>

                    <div className="playlist-body">

                      <h3>
                        {playlist.name}
                      </h3>

                      <span>

                        <FaListUl />

                        {
                          playlist.list.length
                        }

                        {" "}
                        {
                          language?.[lang]?.playList?.traks
                        }
                      </span>

                    </div>

                  </div>

                )

              })
            }

          </div>

      }

    </div>

  );

};

export default MyPlayLists;