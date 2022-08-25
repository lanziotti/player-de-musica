import './style.css';
import PlayImage from '../../assets/play.svg';
import PauseImage from '../../assets/pause.svg';
import NextImage from '../../assets/next.svg';
import PreviousImage from '../../assets/previous.svg';
import StopImage from '../../assets/stop.svg';
import { useRef } from 'react';

export default function Controls({
    audioRef,
    currentMusic,
    iconBtn,
    setIconBtn,
    handleChangeMusic
}) {

    let intervalProgres = null;
    const progresRef = useRef(null);

    function playPause() {

        intervalProgres = setInterval(() => {
            if (audioRef.current.paused) {
                clearInterval(intervalProgres);
            }

            const duration = audioRef.current.duration / 60;
            const currentProgres = ((audioRef.current.currentTime / 60) * 100) / duration;

            progresRef.current.style.width = `${currentProgres}%`;

        }, 1000);

        if (audioRef.current.paused) {
            audioRef.current.play();
            setIconBtn('pause');
            return;
        }

        audioRef.current.pause();
        setIconBtn('play');
    }

    function stop() {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIconBtn('play');
    }

    return (
        <div className='container-controls'>
            <div className='preview-names'>
                <h2>{currentMusic.title}</h2>
                <strong>{currentMusic.artist}</strong>
            </div>

            <div className='container-player'>
                <div className='container-buttons'>
                    <img
                        className='btn-control'
                        src={StopImage}
                        alt=""
                        onClick={() => stop()}
                    />
                    <img
                        className='btn-control'
                        src={PreviousImage}
                        alt=""
                        onClick={() => handleChangeMusic('previous')}
                    />
                    <img
                        className='btn-play-pause'
                        src={iconBtn === 'pause' ? PauseImage : PlayImage}
                        alt=""
                        onClick={() => playPause()}
                    />
                    <img
                        className='btn-control'
                        src={NextImage}
                        alt=""
                        onClick={() => handleChangeMusic('next')}
                    />
                </div>
                <div className='container-progress'>
                    <strong className='start'>0</strong>
                    <div className='container-line'>
                        <div className='progress-line'></div>
                        <div
                            className='progress-line-color'
                            ref={progresRef}
                        ></div>
                    </div>
                    <strong className='end'>3:45</strong>
                </div>
            </div>

            <div className='empty'>

            </div>
        </div>
    )
}