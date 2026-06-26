import React from 'react'
import ArtistInfo from '../pages/ArtistInfo'
import ArtistMusics from '../pages/ArtistMusics'
import '../css/Artist.css'
import { FaTimes } from 'react-icons/fa'

const Artist = (
    {
        lang,
        setPlayList,
        playList,
        dummyData,
        setDummyData,
        currentMusic,
        setCurrentMusic,
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
    }
) => {

    const moveArtist = () => {
        const artist = document.querySelector('.artist');
        if (!artist) return;
        artist.style.left = `-100%`
    }


    return (
        <div className='artist'>
            {
                innerWidth < 750 && currentMusic && <button className='menu-bar' onClick={moveArtist}
                    style={{
                        position: 'sticky',
                        zIndex: '1000',
                        left: '20px',
                        top: '20px'
                    }}
                >
                    <FaTimes className='menu-bar-icon' style={{ color: 'var(--gold)' }} />
                </button>
            }
            <ArtistInfo lang={lang} setPlayList={setPlayList} playList={playList} dummyData={dummyData} setDummyData={setDummyData} currentMusic={currentMusic} />
            <ArtistMusics
                lang={lang} setPlayList={setPlayList} setDummyData={setDummyData}
                currentMusic={currentMusic} setCurrentMusic={setCurrentMusic} playList={playList}
                duration={duration} setDuration={setDuration}
                id={id} setId={setId} seconds={seconds} setSeconds={setSeconds}
                playingId={playingId} setPlayingId={setPlayingId}
                intervalRef={intervalRef} audioRef={audioRef} currentMusicRef={currentMusicRef}
                playing={playing} setPlaying={setPlaying} setShowArtistsBox={setShowArtistsBox}
                playListPages={playListPages}
            />
        </div>
    )
}

export default Artist