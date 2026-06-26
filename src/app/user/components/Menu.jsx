import React from 'react'
import Profile from '../pages/Profile'
import Language from '../pages/Language'
import List from '../pages/List'
import Info from '../pages/Info'
import '../css/Menu.css'
import { FaTimes } from 'react-icons/fa'

const Menu = ({
    setLang, lang, playList, setPlayList,
    dummyData, setDummyData,
    showArtistsBox,
    setShowArtistsBox,
    playListPages, innerWidth
}) => {

    const moveMenu = () => {
        const menu = document.querySelector('.menu');
        if (!menu) return;
        menu.classList.toggle('menu-move')
    }

    return (
        <div className='menu'>

            {
                innerWidth < 1000 && <button className='menu-bar' onClick={moveMenu}
                    style={{
                        position: 'fixed',
                        zIndex: '1000',
                        left: `calc(100% - 75px)`,
                        top: '35px',
                    }}
                >
                    <FaTimes className='menu-bar-icon' style={{ color: 'var(--gold)' }} />
                </button>
            }

            <Profile lang={lang} />
            <Language setLang={setLang} />
            <List
                lang={lang} playList={playList} setPlayList={setPlayList}
                dummyData={dummyData} setDummyData={setDummyData}
                showArtistsBox={showArtistsBox} setShowArtistsBox={setShowArtistsBox}
                playListPages={playListPages} innerWidth={innerWidth}
            />
            <Info lang={lang} />
        </div>
    )
}

export default Menu