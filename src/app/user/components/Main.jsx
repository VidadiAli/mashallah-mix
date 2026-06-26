import React, { useEffect, useRef, useState } from 'react'
import Menu from './Menu';
import User from './User'
import Artist from './Artist';
import '../css/Main.css'

const Main = () => {

    const [innerWidth, setInnerWidth] = useState(window.innerWidth)

    const [lang, setLang] = useState('eng');
    const [playList, setPlayList] = useState([]);
    const [dummyData, setDummyData] = useState([]);
    const [currentMusic, setCurrentMusic] = useState(null);

    const [showArtistsBox, setShowArtistsBox] = useState(null);

    const [duration, setDuration] = useState(null);
    const [id, setId] = useState(null);
    const [seconds, setSeconds] = useState(null);
    const [playingId, setPlayingId] = useState(null);

    const [playing, setPlaying] = useState(null)

    const intervalRef = useRef(null);
    const audioRef = useRef(null);
    const currentMusicRef = useRef(null);

    const [pageForPL, setPageForPL] = useState(1);
    const [totalPagesForPL, setTotalPagesForPL] = useState(1);
    const [currentPlayList, setCurrentPlayList] = useState('')

    const playListPages = {
        page: pageForPL,
        setPage: setPageForPL,
        totalPages: totalPagesForPL,
        setTotalPages: setTotalPagesForPL,
        currentPlayList: currentPlayList,
        setCurrentPlayList: setCurrentPlayList,
        pageSize: 1
    };

    useEffect(() => {

        const userBox = document.querySelector(".user");
        const artistBox = document.querySelector(".artist");
        const menuBox = document.querySelector(".menu");

        if (!userBox || !artistBox || !menuBox) return;

        if (!currentMusic) {
            userBox.style.gridColumn =
                innerWidth <= 1300 ? innerWidth <= 1000 ? "11 span" : "7 span" : "4 span";

            artistBox.style.display = innerWidth <= 700 ? "block" : "none";
        } else {
            userBox.style.gridColumn =
                innerWidth <= 1300 ? innerWidth <= 1000 ? innerWidth <= 750 ? "11 span" : "7 span" : "5 span" : "3 span";

            artistBox.style.display = "block";
        }

        artistBox.style.gridColumn = innerWidth <= 1300 ?
            innerWidth <= 1100 ?
                innerWidth <= 1000 ? "4 span" : '3 span' : '2 span' : '1 span';

        menuBox.style.gridColumn = innerWidth <= 1300 ?
            innerWidth <= 1100 ?
                innerWidth <= 1000 ? "4 span" : '3 span' : '2 span' : '1 span';

    }, [currentMusic, innerWidth]);

    useEffect(() => {

        const handleResize = () => {
            setInnerWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };

    }, []);

    return (
        <div className='main'>
            <Menu
                setLang={setLang} lang={lang} playList={playList} setPlayList={setPlayList}
                dummyData={dummyData} setDummyData={setDummyData}
                showArtistsBox={showArtistsBox} setShowArtistsBox={setShowArtistsBox}
                playListPages={playListPages} innerWidth={innerWidth}
            />
            <User
                lang={lang} playList={playList} setPlayList={setPlayList}
                dummyData={dummyData} setDummyData={setDummyData}
                currentMusic={currentMusic} setCurrentMusic={setCurrentMusic}
                duration={duration} setDuration={setDuration}
                id={id} setId={setId} seconds={seconds} setSeconds={setSeconds}
                playingId={playingId} setPlayingId={setPlayingId}
                intervalRef={intervalRef} audioRef={audioRef} currentMusicRef={currentMusicRef}
                playing={playing} setPlaying={setPlaying}
                showArtistsBox={showArtistsBox} setShowArtistsBox={setShowArtistsBox}
                playListPages={playListPages} innerWidth={innerWidth}
            />
            <Artist
                lang={lang} setPlayList={setPlayList} playList={playList}
                dummyData={dummyData} setDummyData={setDummyData}
                currentMusic={currentMusic} setCurrentMusic={setCurrentMusic}
                duration={duration} setDuration={setDuration}
                id={id} setId={setId} seconds={seconds} setSeconds={setSeconds}
                playingId={playingId} setPlayingId={setPlayingId}
                intervalRef={intervalRef} audioRef={audioRef} currentMusicRef={currentMusicRef}
                playing={playing} setPlaying={setPlaying}
                setShowArtistsBox={setShowArtistsBox}
                playListPages={playListPages}
            />
        </div>
    )
}

export default Main