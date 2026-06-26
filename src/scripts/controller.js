import api from "./api";

const countSeconds = () => {
    setSeconds((prev) => prev + 1)
};

export const listen = (music, setCurrentMusic, setDuration, id, setId, setSeconds, seconds, audioRef, currentMusicRef, intervalRef, setPlayingId, setPlaying, playList) => {

    setDuration(music.duration);
    setId(music._id);
    setPlaying(true)

    if (currentMusicRef.current !== music?._id) {

        if (audioRef.current) {
            audioRef.current.pause();
        }

        clearInterval(intervalRef.current);

        audioRef.current = new Audio(music?.musicUrl);
        currentMusicRef.current = music?._id;

        setSeconds(0);

        try {
            api.post(`/user/increaseListenCount/${music?._id}`);
        } catch (error) {
            console.log(error)
        }
    }

    audioRef.current.play();

    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
        setSeconds(
            Math.floor(audioRef.current.currentTime)
        );
    }, 1000);

    setPlayingId(music?._id);

    audioRef.current.onended = () => {
        clearInterval(intervalRef.current);

        currentMusicRef.current = null;

        setPlayingId(null);

        setSeconds(0);

        nextMusic(music, setCurrentMusic, setDuration, id, setId, setSeconds, seconds, audioRef, currentMusicRef, intervalRef, setPlayingId, setPlaying, playList)

    };
};

export const stopListen = (audioRef, intervalRef, setPlayingId) => {

    if (!audioRef.current) return;

    audioRef.current.pause();

    clearInterval(intervalRef.current);

    setPlayingId(null)
};

export const nextMusic = (music, setCurrentMusic, setDuration, id, setId, setSeconds, seconds, audioRef, currentMusicRef, intervalRef, setPlayingId, setPlaying, playList) => {
    let currentIndex = playList?.indexOf(playList?.find(e => e?._id === music?._id));
    if (currentIndex === playList?.length - 1) {
        currentIndex = -1;
    }
    const newMusic = playList[currentIndex + 1];
    setCurrentMusic(newMusic);
    listen(newMusic, setCurrentMusic, setDuration, id, setId, setSeconds, seconds, audioRef, currentMusicRef, intervalRef, setPlayingId, setPlaying, playList);
}


export const previusMusic = (music, setCurrentMusic, setDuration, id, setId, setSeconds, seconds, audioRef, currentMusicRef, intervalRef, setPlayingId, setPlaying, playList) => {
    let currentIndex = playList?.indexOf(playList.find(e => e?._id === music?._id));
    if (currentIndex === 0) {
        currentIndex = playList?.length;
    }
    const newMusic = playList[currentIndex - 1];
    setCurrentMusic(newMusic);
    listen(newMusic, setCurrentMusic, setDuration, id, setId, setSeconds, seconds, audioRef, currentMusicRef, intervalRef, setPlayingId, setPlaying, playList);
}