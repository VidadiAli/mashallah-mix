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

const AddingToPlayList = ({ setShowAdding, music = null, editItem = null, mainPlayList = null, lang }) => {
    const [createNew, setCreateNew] = useState(false);
    const [myPlayLists, setMyPlayLists] = useState([]);
    const [playListName, setPlayListName] = useState('');
    const [updatingList, setUpdatingList] = useState([]);
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

        const names = playLists?.length > 0 ? playLists?.map(e => e.name?.toLowerCase()) : [];
        if (names?.includes(playListName?.toLowerCase())) {
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

        window.dispatchEvent(new Event("myPlayListsChanged"));

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

        window.dispatchEvent(new Event("myPlayListsChanged"));

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


    const editPlayList = () => {
        if (!editItem || !mainPlayList) return;
        const names = mainPlayList?.
            map(e => e.name?.toLowerCase() != editItem?.name?.toLowerCase() ? e.name?.toLowerCase() : null).
            filter(e => e != null);

        if (names?.includes(playListName?.toLowerCase())) {
            setMsg({
                msg: `${language?.[lang]?.playList?.msg?.errorExsistName}`,
                type: 'error'
            });
            return;
        }

        if (updatingList?.length == 0) {
            setMsg({
                msg: `${language?.[lang]?.playList?.msg?.errorListLength}`,
                type: 'error'
            });
            return;
        }

        const newItem = {
            name: playListName,
            list: updatingList
        };

        const indexOfList = mainPlayList.findIndex(e => e?.name === editItem?.name);
        mainPlayList.splice(indexOfList, 1);
        mainPlayList.push(newItem);

        localStorage.setItem('myPlayLists', JSON.stringify(mainPlayList));

        setMsg({
            msg: `${language?.[lang]?.playList?.msg?.successUpdating}`,
            type: 'success'
        });

        setTimeout(() => {
            setShowAdding(null);
            window.dispatchEvent(new Event("myPlayListsChanged"));
        }, 600);
    }

    const removeFromList = (item) => {
        if (!editItem) return;
        const newList = updatingList?.filter(e => e._id != item?._id);
        setUpdatingList(newList);
        setMsg({
            msg: '',
            type: ''
        });
    }

    useEffect(() => {
        if (!editItem) return;
        setPlayListName(editItem?.name);
        setUpdatingList(editItem?.list);
    }, [editItem]);

    return createPortal(
        <div className="playlist-modal" >

            <div className='main-modal'>
                <div className="playlist-header">

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <h3>
                            <FaMusic />
                            {
                                editItem ? language?.[lang]?.playList?.update?.updateHead : language?.[lang]?.playList?.add
                            }
                        </h3>

                        <span style={{ color: 'white', display: 'flex', gap: '10px' }}>
                            <span style={{ color: 'var(--gold)' }}>{editItem ? editItem?.name : music?.name}</span>
                            {!editItem && <> {" / "} {music?.artist} </>}
                        </span>
                    </div>

                    <button
                        className="close-btn"
                        onClick={() => setShowAdding(null)}
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

                {
                    !editItem && <div className="playlist-create-trigger">

                        <button
                            onClick={() => setCreateNew(true)}
                        >
                            <FaPlus />
                            {
                                language?.[lang]?.playList?.create
                            }
                        </button>

                    </div>
                }

                {
                    createNew || editItem ?

                        <div className="playlist-create">

                            <input
                                type="text"
                                placeholder="Playlist name..."
                                value={playListName}
                                onChange={(e) => {
                                    setPlayListName(e.target.value);
                                    setMsg({
                                        msg: '',
                                        type: ''
                                    })
                                }
                                }
                            />

                            {
                                editItem && <div className='playlist-list'>
                                    {
                                        updatingList?.map((item, index) => {
                                            return <div
                                                key={index}
                                                className="playlist-item"
                                            >
                                                <div className='playlist-item-info'
                                                    style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'self-start' }}>

                                                    <h4>{item.name}</h4>
                                                    <span>{item?.artist}</span>

                                                </div>

                                                <button
                                                    className="playlist-add-btn"
                                                    onClick={() =>
                                                        removeFromList(item)
                                                    }
                                                >
                                                    <FaTimes />
                                                </button>

                                            </div>
                                        })
                                    }
                                </div>
                            }

                            {
                                editItem ?
                                    <button
                                        className="create-btn"
                                        onClick={editPlayList}
                                    >
                                        {
                                            language?.[lang]?.playList?.update?.updateHead
                                        }
                                    </button>
                                    :
                                    <button
                                        className="create-btn"
                                        onClick={createPlayList}
                                    >
                                        {
                                            language?.[lang]?.playList?.createBtn
                                        }
                                    </button>
                            }

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