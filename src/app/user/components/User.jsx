import React, { useEffect, useRef, useState } from 'react'
import MusicController from '../pages/MusicController'
import '../css/User.css'
import Musics from '../pages/Musics'
import AllArtists from '../pages/AllArtists'
import MyPlayLists from '../pages/MyPlayLists'
import Remix from '../pages/Remix'

const User = ({
  lang,
  playList,
  setPlayList,
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
  showArtistsBox,
  setShowArtistsBox,
  playListPages,
  innerWidth
}) => {

  const [parentWidth, setParentWidth] = useState(0);

  const userRef = useRef(null);

  useEffect(() => {

    const observer =
      new ResizeObserver(entries => {

        setParentWidth(
          entries[0].contentRect.width
        );

      });

    if (userRef.current) {
      observer.observe(userRef.current);
    }

    return () => observer.disconnect();

  }, []);

  return (
    <div className='user' ref={userRef}>

      {
        showArtistsBox === 'artists' ?
          <AllArtists
            lang={lang}
            setCurrentMusic={setCurrentMusic}
            currentMusic={currentMusic}
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
            setPlayList={setPlayList}
            playList={playList}
            dummyData={dummyData}
            setDummyData={setDummyData}
            showArtistsBox={showArtistsBox}
            setShowArtistsBox={setShowArtistsBox}
            playListPages={playListPages}
            innerWidth={innerWidth}
          /> : showArtistsBox === 'my-lists' ?
            <MyPlayLists
              lang={lang}
              setCurrentMusic={setCurrentMusic}
              currentMusic={currentMusic}
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
              setPlayList={setPlayList}
              playList={playList}
              dummyData={dummyData}
              setDummyData={setDummyData}
              showArtistsBox={showArtistsBox}
              setShowArtistsBox={setShowArtistsBox}
              playListPages={playListPages}
              innerWidth={innerWidth}
            /> : showArtistsBox === 'remix' ?
              <Remix
                lang={lang}
                setCurrentMusic={setCurrentMusic}
                currentMusic={currentMusic}
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
                setPlayList={setPlayList}
                playList={playList}
                dummyData={dummyData}
                setDummyData={setDummyData}
                showArtistsBox={showArtistsBox}
                setShowArtistsBox={setShowArtistsBox}
                playListPages={playListPages}
                innerWidth={innerWidth}
              /> :
              <Musics
                lang={lang}
                setCurrentMusic={setCurrentMusic}
                currentMusic={currentMusic}
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
                setPlayList={setPlayList}
                playList={playList}
                dummyData={dummyData}
                setDummyData={setDummyData}
                setShowArtistsBox={setShowArtistsBox}
                playListPages={playListPages}
                innerWidth={innerWidth}
              />

      }

      <MusicController
        lang={lang}
        setCurrentMusic={setCurrentMusic}
        currentMusic={currentMusic}
        parentWidth={parentWidth}
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
        setPlayList={setPlayList}
        playList={playList}
      />

    </div>
  )
}

export default User