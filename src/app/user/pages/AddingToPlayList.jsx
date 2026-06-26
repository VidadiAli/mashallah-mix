import React, { useEffect, useState } from 'react'
import {
    FaPlus,
    FaMusic,
    FaListUl,
    FaTimes,
    FaCheckCircle
} from "react-icons/fa";
import { createPortal } from 'react-dom'
import { language } from '../../../scripts/language';

const AddingToPlayList = ({ setShowAdding, music, lang }) => {
    const [createNew, setCreateNew] = useState(false);
    const [myPlayLists, setMyPlayLists] = useState([]);
    const [playListName, setPlayListName] = useState('');
    const [musicId, setMusicId] = useState({
        musicId: '',
        listIndex: []
    });
    const [msg, setMsg] = useState({
        msg: '',
        type: ''
    });

    const createPlayList = () => {
        if (playListName.trim() === '') {
            setMsg({
                msg: `${language?.[lang]?.playList.msg?.errorBlankField}`,
                type: 'error'
            });
            return;
        }

        const playLists = localStorage.getItem('myPlayLists') ?
            JSON.parse(localStorage.getItem('myPlayLists')) : [];

        const names = playLists?.length > 0 ? playLists?.map(e => e.name) : [];
        if (names?.includes(playListName)) {
            setMsg({
                msg: `${language?.[lang]?.playList?.msg?.errorExsistName}`,
                type: 'error'
            });
            return;
        }

        const newList = [music];
        const newItem = {
            name: playListName,
            list: newList
        };

        playLists.push(newItem);

        localStorage.setItem('myPlayLists', JSON.stringify(playLists));

        setMsg({
            msg: `${language?.[lang]?.playList?.msg?.successCreate}`,
            type: 'success'
        });

        setTimeout(() => {
            setShowAdding(null);
        }, 1500);

        return;
    };

    const addPlayList = (e, index) => {
        if (musicId && musicId?.listIndex?.length > 0
            && musicId?.listIndex?.includes(index)) {
            setMsg({
                msg: `${language?.[lang]?.playList?.msg?.errorExsistInList}`,
                type: 'error'
            });
            return;
        }

        const list = localStorage.getItem('myPlayLists') ?
            JSON.parse(localStorage.getItem('myPlayLists')) : [];

        if (list?.length <= 0) return;

        const currentList = list[index];

        const name = currentList?.name;

        currentList?.list.push(music)

        list.splice(index, 1);

        list.push({
            name: name,
            list: currentList?.list
        });

        localStorage.setItem('myPlayLists', JSON.stringify(list));

        setMsg({
            msg: `${language?.[lang]?.playList?.msg?.successAdding}`,
            type: 'success'
        });

        setTimeout(() => {
            setShowAdding(null);
        }, 1500);

        return;
    }

    useEffect(() => {
        const currentList = localStorage.getItem('myPlayLists') ?
            JSON.parse(localStorage.getItem('myPlayLists')) : []
        setMyPlayLists(currentList);

        let indexOfMusic = null;

        if (currentList?.length <= 0) return;

        for (const i in currentList) {

            indexOfMusic = currentList[i]?.list.map(e => e._id).indexOf(music?._id);

            if (indexOfMusic !== -1) {
                musicId?.listIndex?.push(Number(i));
                setMusicId({
                    musicId: music?._id,
                    listIndex: musicId?.listIndex
                });
            }
        };
    }, [music])


    return createPortal(
        <div className="playlist-modal" >

            <div className='main-modal'>
                <div className="playlist-header">

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <h3>
                            <FaMusic />
                            {
                                language?.[lang]?.playList?.add
                            }
                        </h3>

                        <span style={{ color: 'white', display: 'flex', gap: '10px' }}>
                            <span style={{ color: 'var(--gold)' }}>{music?.name}</span>
                            / {music?.artist}
                        </span>;
                    </div>

                    <button
                        className="close-btn"
                        onClick={() => setShowAdding(false)}
                    >
                        <FaTimes />
                    </button>

                </div>

                {
                    msg?.msg &&
                    <p className={`playlist-msg ${msg.type}`}>
                        {msg.msg}
                    </p>
                }

                <div className="playlist-create-trigger">

                    <button
                        onClick={() => setCreateNew(true)}
                    >
                        <FaPlus />
                        {
                            language?.[lang]?.playList?.create
                        }
                    </button>

                </div>

                {
                    createNew ?

                        <div className="playlist-create">

                            <input
                                type="text"
                                placeholder="Playlist name..."
                                value={playListName}
                                onChange={(e) =>
                                    setPlayListName(e.target.value)
                                }
                            />

                            <button
                                className="create-btn"
                                onClick={createPlayList}
                            >
                                {
                                    language?.[lang]?.playList?.createBtn
                                }
                            </button>

                        </div>

                        :

                        <div className="playlist-list">

                            {
                                myPlayLists?.length > 0 ?

                                    myPlayLists.map((e, index) =>

                                        <div
                                            key={index}
                                            className="playlist-item"
                                        >

                                            <div className="playlist-item-info">

                                                <FaListUl />

                                                <div>

                                                    <h4>{e.name}</h4>

                                                    <span style={{ display: 'flex', gap: '5px' }}>
                                                        <span>
                                                            {
                                                                e.list?.length
                                                            }
                                                        </span>
                                                        <span>
                                                            {
                                                                language?.[lang]?.playList?.traks
                                                            }
                                                        </span>
                                                    </span>

                                                </div>

                                            </div>

                                            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                                {
                                                    musicId && musicId?.listIndex?.length > 0
                                                    && musicId?.listIndex?.includes(index) &&
                                                    <span>
                                                        <FaCheckCircle className="playlist-exists" />
                                                    </span>
                                                }

                                                <button
                                                    className="playlist-add-btn"
                                                    onClick={() =>
                                                        addPlayList(e, index)
                                                    }
                                                >
                                                    <FaPlus />
                                                </button>
                                            </div>

                                        </div>

                                    )

                                    :

                                    <div className="empty-playlists">

                                        <FaMusic />

                                        <p>
                                            {
                                                language?.[lang]?.playList?.noList
                                            }
                                        </p>

                                    </div>
                            }

                        </div>
                }

            </div>
        </div >,
        document.body
    )
}

export default AddingToPlayList