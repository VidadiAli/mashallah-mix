import React, { useEffect, useState } from "react";
import {
  FaMusic,
  FaPlay,
  FaListUl,
  FaCompactDisc,
  FaBars,
  FaEdit,
  FaTrash
} from "react-icons/fa";
import { language } from "../../../scripts/language";
import { listen } from "../../../scripts/controller";
import Loading from "../../loadings/Loading";
import Alert from "../../alert/Alert";
import AddingToPlayList from "./AddingToPlayList";

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
  const [loading, setLoading] = useState(null);
  const [item, setItem] = useState(null);
  const [editItem, setEditItem] = useState(null);

  const [alert, setAlert] = useState({
    type: '',
    response: '',
    isQuestion: ''
  });

  const [answer, setAnswer] = useState(null);
  const [showAlert, setShowAlert] = useState('')

  useEffect(() => {
    const loadPlaylists = () => {
      const storage = localStorage.getItem("myPlayLists");

      if (!storage) {
        setPlayLists([]);
        return;
      }

      try {
        const data = JSON.parse(storage);
        setPlayLists(Array.isArray(data) ? data : []);
      } catch {
        setPlayLists([]);
      }
    };

    loadPlaylists();

    window.addEventListener("myPlayListsChanged", loadPlaylists);

    return () => {
      window.removeEventListener("myPlayListsChanged", loadPlaylists);
    };
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



  const deleteList = (list) => {
    setAlert({
      type: 'warning',
      response: 'Bu playlisti silməyə əminsiz?',
      isQuestion: true
    });
    setItem(list);
    setShowAlert('show-alert')
  };


  useEffect(() => {
    const removeList = async () => {
      if (answer && item) {
        try {
          setLoading(true)

          const storage = localStorage.getItem('myPlayLists');
          if (!storage) return;

          const myPlaylists = JSON.parse(storage);
          const indexOfList = myPlaylists.findIndex(
            playlist => playlist.name === item.name
          );

          if (indexOfList === -1) return;

          myPlaylists?.splice(indexOfList, 1);

          localStorage.setItem('myPlayLists', JSON.stringify(myPlaylists));

          setPlayLists(myPlaylists);

          setAlert({
            type: 'success',
            response: 'Playlist uğurla silindi',
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

    removeList()
  }, [answer])

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
            <FaMusic className='menu-bar-icon' />
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

                      <div style={{ display: 'flex', gap: '5px', justifyContent: 'space-between' }}>
                        <h3>
                          {playlist.name}
                        </h3>

                        <div className="playlist-controller-btns">
                          <button className="edit-playlist" onClick={() => setEditItem(playlist)} >
                            <FaEdit />
                          </button>
                          <button className="delete-playlist" onClick={() => deleteList(playlist)}>
                            <FaTrash />
                          </button>
                        </div>
                      </div>

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

      {
        loading && <Loading />
      }


      {
        editItem && <AddingToPlayList setShowAdding={setEditItem} editItem={editItem} mainPlayList={playLists} lang={lang} />
      }

    </div>

  );

};

export default MyPlayLists;